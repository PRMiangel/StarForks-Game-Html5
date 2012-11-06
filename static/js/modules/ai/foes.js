define(['modules/ai/characters/meteor'], function(meteor) {
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
        Meteor: meteor.Meteor
    };
});
