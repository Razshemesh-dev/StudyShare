const Reviews = require('../models/Reviews'); 

exports.saveReview = (req, res, next) => {
  const review = new Reviews(
    req.body.tool_name,
    req.body.review_text,
    req.body.rating,
    req.body.author_name,
    req.body.tool_category,
    req.body.pros_cons
  );
  review.addNewReview()
    .then(() => {
      res.redirect('/system_reviews'); 
    })
    .catch(err => {
      console.error('Error saving review:', err);
      res.status(500).send('Internal Server Error');
    })
};

exports.getAllReviews = async (req, res, next) => {
  try {
    const [reviews] = await Reviews.fetchAll();
    console.log('=== FETCHED REVIEWS ===');
    console.log('Number of reviews:', reviews ? reviews.length : 0);
    console.log('Reviews data:', JSON.stringify(reviews, null, 2));
    console.log('======================');
    res.render('review/system_reviews', { reviews });
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.render('review/system_reviews', { reviews: [] });
  }
};