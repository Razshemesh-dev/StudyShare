const TeamApplication = require('../models/TeamApplication'); 

exports.submitTeamApplication = (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send('No form data received');
    }

    const { full_name, email_address, interest_area, about_you, type_of_degree, degree_title, hours_per_week } = req.body;

    // Validate required fields
    if (!full_name || !email_address || !interest_area || !about_you || !type_of_degree || !degree_title || !hours_per_week) {
      return res.status(400).send('Missing required fields');
    }

    const teamApplication = new TeamApplication(
      full_name,
      email_address,
      interest_area,
      about_you,
      type_of_degree,
      degree_title,
      hours_per_week
    );

    teamApplication.save()
      .then(() => {
        console.log('Team application saved successfully');
        res.render('About/teamApplicationSuccess');
      })
      .catch(err => {
        console.error('Error saving team application:', err);
        console.error('Error details:', err.message);
        res.status(500).send('Internal Server Error: ' + err.message);
      });
  } catch (err) {
    console.error('Unexpected error in submitTeamApplication:', err);
    res.status(500).send('Internal Server Error');
  }
};

