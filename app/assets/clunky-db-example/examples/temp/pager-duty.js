var pager, PagerDuty;
 
PagerDuty = require('pagerduty');
 
pager = new PagerDuty({
  serviceKey: '12345678901234567890123456789012' // required 
});
 
pager.create({
  description: 'testError', // required 
  details: {
    foo: 'bar'
  },
  callback: function(err, response) {
    if (err) throw err;
 
    pager.acknowledge({
      incidentKey: response.incident_key, // required 
      description: 'Got the test error!',
      details: {
        foo: 'bar'
      },
      callback: function(err, response) {
        if (err) throw err;
 
        pager.resolve({
          incidentKey: response.incident_key, // required 
          description: 'Resolved the test error!',
          details: {
            foo: 'bar'
          },
          callback: function(err, response) {
            if (err) throw err;
          }
        });
      }
    });
  }
});