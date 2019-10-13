'use strict';
module.exports = function(app) {
  var EducationCost= require('../controllers/EducationCostController');
  app.route('/calculate_cost').get(EducationCost.calculate_cost)
};
