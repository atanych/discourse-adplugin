
Ember.Handlebars.registerHelper('zubov', function(user, group, options){
    user = Ember.Handlebars.get(this, user, options);
    group = Ember.Handlebars.get(this, group, options);
    return user;
});

// export default Ember.Helper.extend({
//     compute(params, hash) {
//         let index = params[0];
//         let n = parseInt(params[1]);
//         if (n && n > 0) {
//             return (index % n) === 0;
//         } else {
//             return false;
//         }
//     }
// });