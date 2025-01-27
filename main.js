// Animatak \\\
const ChatCommandProcessor = new NativeClass('Terraria.Chat', 'ChatCommandProcessor');
const NPC = new NativeClass('Terraria', 'NPC');
const NPCID = new NativeClass('Terraria.ID', 'NPCID');
const Main = new NativeClass('Terraria', 'Main');
const Lang = new NativeClass('Terraria', 'Lang');
const Vector2 = new NativeClass('Microsoft.Xna.Framework', 'Vector2');
const DrawRotation = new NativeClass('Microsoft.Xna.Framework.Graphics', 'SpriteBatch')['void Draw(Texture2D texture, Vector2 position, Nullable`1 sourceRectangle, Color color, float rotation, Vector2 origin, Vector2 scale, SpriteEffects effects, float layerDepth)'];
const Distance = Vector2['float Distance(Vector2 value1, Vector2 value2)'];
const Addition = Vector2['Vector2 op_Addition(Vector2 value1, Vector2 value2)'];
const Subtraction = Vector2['Vector2 op_Subtraction(Vector2 value1, Vector2 value2)'];
const Color = new NativeClass('Microsoft.Xna.Framework.Graphics', 'Color');
const SpriteEffects = new NativeClass('Microsoft.Xna.Framework.Graphics', 'SpriteEffects');

const nColor = Color.new()["void .ctor(int r, int g, int b, int a)"];
const nVector2 = Vector2.new()["void .ctor(float x, float y)"];

const npcTypes = new Set();
const activeNPCs = new Set();

let texPoint = null;

const npcInfo = "./NPCs.json";
import { translate } from './translate.js';

function saveDataToFile(data, filePath) {
    const json = JSON.stringify(data, null, 2);
    tl.file.write(filePath, json);
}

function loadDataFromFile(filePath) {
    if (!tl.file.exists(filePath)) {
        return {};
    }
    const json = tl.file.read(filePath);
    return JSON.parse(json);
}

function updateDataInFile(updateFunction, filePath) {
    const data = loadDataFromFile(filePath);
    updateFunction(data);
    saveDataToFile(data, filePath);
}

function saveNPCs() {
    const npcData = {
        npcTypes: Array.from(npcTypes),
    };
    saveDataToFile(npcData, npcInfo);
}

function loadNPCs() {
    const data = loadDataFromFile(npcInfo);
    if (!data || !data.npcTypes) {
        return;
    }
    npcTypes.clear();
    data.npcTypes.forEach(npcID => npcTypes.add(npcID));
}

Main.Initialize_AlmostEverything.hook((original, self) => {
    original(self);
    loadNPCs();
    texPoint = tl.texture.load("Texture/Cursor.png");
});

Main.DrawRain.hook((original, self) => {
    original(self);

    const player = Main.player[Main.myPlayer];
    const nearestNPCIndex = findNearestNPCIndex(player.position);

    if (nearestNPCIndex !== -1) {
        const npc = Main.npc[nearestNPCIndex];

        if (npc.active) {
            const distance = Distance(player.Center, npc.Center);

            const maxDistance = 1000;
            const minDistance = 75;
            const normalizedDistance = Math.min(
                1,
                Math.max(0, (distance - minDistance) / (maxDistance - minDistance))
            );

            if (distance > minDistance) {
                const direction = Subtraction(npc.Center, player.Center);
                const rotation = Math.atan2(direction.Y, direction.X);

                const offsetDistance = 38;
                const offset = nVector2(
                    Math.cos(rotation) * offsetDistance,
                    Math.sin(rotation) * offsetDistance
                );

                const arrowPosition = Addition(player.Center, offset);
                const screenArrowPos = Subtraction(arrowPosition, Main.screenPosition);

                const textureOrigin = nVector2(10, 10);
                const scale = nVector2(1, 1);

                DrawRotation(
                    Main.spriteBatch,
                    texPoint,
                    screenArrowPos,
                    null,
                    Color.White,
                    rotation,
                    textureOrigin,
                    scale,
                    SpriteEffects.None,
                    0
                );
            }
        }
    }
});


NPC.UpdateNPC.hook((original, self, i) => {
    original(self, i);

    if (npcTypes.has(self.type)) {
        if (self.active && !activeNPCs.has(self.whoAmI)) {
            activeNPCs.add(self.whoAmI);
            Main.NewText(`[c/00FFFF:${getNPCNameById(self.type)}] ${translate.foundText()}`, 255, 255, 0);
        } else if (!self.active && activeNPCs.has(self.whoAmI)) {
            activeNPCs.delete(self.whoAmI);
        }
    }
});

ChatCommandProcessor.ProcessIncomingMessage.hook((original, self, message, client_id) => {
    original(self, message, client_id);
    const command = message.Text.trim();
    const args = command.split(/ +/).slice(1);

    if (command.startsWith("/add")) {
        if (args.length === 0) {
            return Main.NewText(translate.infoUseAdd(), 255, 255, 0);
        }
        const npcID = getNpcID(args);
        if (npcID === null) {
            return Main.NewText(`${translate.npcNotFound()} ${args.join(" ")}`, 255, 0, 0);
        }
        if (npcTypes.has(npcID)) {
            return Main.NewText(`${translate.npcAlreadyInList()} ${getNPCNameById(npcID)}`, 255, 255, 0);
        }
        npcTypes.add(npcID);
        saveNPCs();
        return Main.NewText(`${translate.npcAdded()} ${getNPCNameById(npcID)}`, 0, 255, 0);
    }

    if (command.startsWith("/remove")) {
        if (args.length === 0) {
            return Main.NewText(translate.infoUseRemove(), 255, 255, 0);
        }
        const npcName = args.join(" ").toLowerCase();
        const npcID = getNpcID([npcName]);
        if (npcID === null) {
            return Main.NewText(`${translate.npcNotFound()} ${npcName}`, 255, 0, 0);
        }
        if (npcTypes.has(npcID)) {
            npcTypes.delete(npcID);
            saveNPCs();
            return Main.NewText(`${translate.npcRemoved()} ${getNPCNameById(npcID)}`, 0, 255, 0);
        }
        return Main.NewText(`${translate.npcNotInList()} ${getNPCNameById(npcID)}`, 255, 0, 0);
    }

    if (command === "/list") {
        if (npcTypes.size === 0) {
            return Main.NewText(translate.noNpcsAdded(), 255, 255, 0);
        }
        Main.NewText(translate.npcList(), 255, 255, 0);
        npcTypes.forEach(npcID => {
            const npcName = getNPCNameById(npcID);
            Main.NewText(`[c/00FFFF:${npcName}] (ID: [c/00FFFF:${npcID}])`, 255, 255, 255);
        });
        return;
    }

    if (command === "/clear") {
        npcTypes.clear();
        saveNPCs();
        return Main.NewText(translate.npcListCleared(), 0, 255, 0);
    }
});

function getNpcID(args) {
    if (args.length < 1) return null;
    const input = args.join(" ").trim();
    const npcID = parseInt(input, 10);

    if (!isNaN(npcID) && npcID > 0) {
        return npcID;
    }

    return getNPCIdByName(input.toLowerCase());
}

function getNPCIdByName(name) {
    for (let i = 1; i < NPCID.Count; i++) {
        const npcName = Lang.GetNPCNameValue(i).toLowerCase();
        if (npcName === name) {
            return i;
        }
    }
    return null;
}

function getNPCNameById(id) {
    return Lang.GetNPCNameValue(id);
}

function findNearestNPCIndex(playerPosition) {
    let minDistance = 1250;
    let nearestNPCIndex = -1;
    for (let i = 0; i < Main.npc.length; i++) {
        const npc = Main.npc[i];
        if (npcTypes.has(npc.type)) {
            const distance = Distance(playerPosition, npc.position);
            if (distance < minDistance) {
                minDistance = distance;
                nearestNPCIndex = i;
            }
        }
    }
    return nearestNPCIndex;
}