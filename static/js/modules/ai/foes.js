define(
    [
        'modules/ai/characters/meteor',
        'modules/ai/characters/explorer'
    ],
    function(meteor, explorer) {
        /*
         * This is basically a proxy module for all the enemies in the
         * static/js/modules/ai/enemies/ lib
         *
         * In this module we also implement Enemy, the base class for all the
         * monsters.
         */


        //
        // Return API
        return {
            Explorer: explorer.Explorer,
            Meteor: meteor.Meteor
        };
    });
