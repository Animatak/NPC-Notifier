const GameCulture = new NativeClass('Terraria.Localization', 'GameCulture');

/*
* Re-adding translations to Mod's response.
* So that everyone can fully enjoy the Mod <3
*/

const translations = {
    Portuguese: {
        npcAlreadyInList: "O NPC já está na lista:",
        foundText: "apareceu próximo de você!",
        infoUseAdd: "Uso: /add <Nome ou ID>",
        infoUseRemove: "Uso: /remove <Nome ou ID>",
        npcNotFound: "NPC não encontrado:",
        npcList: "Lista de NPC's:",
        noNpcsAdded: "Nenhum NPC adicionado à lista.",
        npcAdded: "NPC adicionado à lista:",
        npcNotInList: "O NPC não está na lista:",
        npcRemoved: "NPC removido da lista:",
        npcListCleared: "A Lista de NPC's foi limpa!"
    },
    Spanish: {
        npcAlreadyInList: "El NPC ya está en la lista:",
        foundText: "¡apareció cerca de ti!",
        infoUseAdd: "Uso: /add <Nombre o ID>",
        infoUseRemove: "Uso: /remove <Nombre o ID>",
        npcNotFound: "NPC no encontrado:",
        npcList: "Lista de NPC's:",
        noNpcsAdded: "Ningún NPC añadido a la lista.",
        npcAdded: "NPC añadido a la lista:",
        npcNotInList: "El NPC no está en la lista:",
        npcRemoved: "NPC eliminado de la lista:",
        npcListCleared: "¡La lista de NPCs ha sido limpiada!"
    },
    Italian: {
        npcAlreadyInList: "L'NPC è già nella lista:",
        foundText: "è apparso vicino a te!",
        infoUseAdd: "Utilizzo: /add <Nome o ID>",
        infoUseRemove: "Utilizzo: /remove <Nome o ID>",
        npcNotFound: "NPC non trovato:",
        npcList: "Lista di NPC:",
        noNpcsAdded: "Nessun NPC aggiunto alla lista.",
        npcAdded: "NPC aggiunto alla lista:",
        npcNotInList: "O NPC non è nella lista:",
        npcRemoved: "NPC rimosso dalla lista:",
        npcListCleared: "La lista dei NPC è stata pulita!"
    },
    French: {
        npcAlreadyInList: "Le PNJ est déjà dans la liste:",
        foundText: "est apparu près de vous!",
        infoUseAdd: "Utilisation : /add <Nom ou ID>",
        infoUseRemove: "Utilisation : /remove <Nom ou ID>",
        npcNotFound: "PNJ introuvable:",
        npcList: "Liste des PNJ:",
        noNpcsAdded: "Aucun PNJ ajouté à la liste.",
        npcAdded: "PNJ ajouté à la liste:",
        npcNotInList: "Le PNJ n'est pas dans la liste:",
        npcRemoved: "PNJ supprimé de la liste:",
        npcListCleared: "La liste des PNJ a été nettoyée!"
    },
    German: {
        npcAlreadyInList: "NPC ist bereits in der Liste:",
        foundText: "ist in Ihrer Nähe erschienen!",
        infoUseAdd: "Verwendung: /add <Name oder ID>",
        infoUseRemove: "Verwendung: /remove <Name oder ID>",
        npcNotFound: "NPC nicht gefunden:",
        npcList: "Liste der NPCs:",
        noNpcsAdded: "Keine NPCs zur Liste hinzugefügt.",
        npcAdded: "NPC zur Liste hinzugefügt:",
        npcNotInList: "Der NPC ist nicht in der Liste:",
        npcRemoved: "NPC von der Liste entfernt:",
        npcListCleared: "Die Liste der NPCs wurde geleert!"
    },
    Russian: {
        npcAlreadyInList: "NPC уже в списке:",
        foundText: "появился рядом с вами!",
        infoUseAdd: "Использование: /add <Имя или ID>",
        infoUseRemove: "Использование: /remove <Имя или ID>",
        npcNotFound: "NPC не найден:",
        npcList: "Список NPC:",
        noNpcsAdded: "Ни один NPC не добавлен в список.",
        npcAdded: "NPC добавлен в список:",
        npcNotInList: "NPC нет в списке:",
        npcRemoved: "NPC удален из списка:",
        npcListCleared: "Список NPC был очищен!"
    },
    Default: {
        npcAlreadyInList: "The NPC is already in the list:",
        foundText: "appeared near you!",
        infoUseAdd: "Usage: /add <Name or ID>",
        infoUseRemove: "Usage: /remove <Name or ID>",
        npcNotFound: "NPC not found:",
        npcList: "NPC List:",
        noNpcsAdded: "No NPCs added to the list.",
        npcAdded: "NPC added to the list:",
        npcNotInList: "NPC not in the list:",
        npcRemoved: "NPC removed from the list:",
        npcListCleared: "The NPC list has been cleared!"
    }
};

function getCurrentCulture() {
    const cultures = GameCulture.CultureName;
    for (let cultureName in cultures) {
        if (GameCulture.FromCultureName(cultures[cultureName]).IsActive) {
            return cultureName;
        }
    }
    return 'Default';
}

const translate = {
    npcAlreadyInList() {
        const culture = getCurrentCulture();
        return translations[culture]?.npcAlreadyInList || translations.Default.npcAlreadyInList;
    },
    foundText() {
        const culture = getCurrentCulture();
        return translations[culture]?.foundText || translations.Default.foundText;
    },
    infoUseAdd() {
        const culture = getCurrentCulture();
        return translations[culture]?.infoUseAdd || translations.Default.infoUseAdd;
    },
    infoUseRemove() {
        const culture = getCurrentCulture();
        return translations[culture]?.infoUseRemove || translations.Default.infoUseRemove;
    },
    npcNotFound() {
        const culture = getCurrentCulture();
        return translations[culture]?.npcNotFound || translations.Default.npcNotFound;
    },
    npcList() {
        const culture = getCurrentCulture();
        return translations[culture]?.npcList || translations.Default.npcList;
    },
    noNpcsAdded() {
        const culture = getCurrentCulture();
        return translations[culture]?.noNpcsAdded || translations.Default.noNpcsAdded;
    },
    npcAdded() {
        const culture = getCurrentCulture();
        return translations[culture]?.npcAdded || translations.Default.npcAdded;
    },
    npcNotInList() {
        const culture = getCurrentCulture();
        return translations[culture]?.npcNotInList || translations.Default.npcNotInList;
    },
    npcRemoved() {
        const culture = getCurrentCulture();
        return translations[culture]?.npcRemoved || translations.Default.npcRemoved;
    },
    npcListCleared() {
        const culture = getCurrentCulture();
        return translations[culture]?.npcListCleared || translations.Default.npcListCleared;
    }
};

export { translate };