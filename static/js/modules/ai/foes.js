define(
    [
        'modules/ai/characters/meteor',
        'modules/ai/characters/explorers'
    ],
    function(meteor, explorers) {
        /*
         * This is basically a proxy module for all the enemies in the
         * static/js/modules/ai/enemies/ lib
         */


        //
        // Return API
        return {
            Explorer: explorers.Explorer,
            HeavyExplorer: explorers.HeavyExplorer,
            Meteor: meteor.Meteor
        };
    });
