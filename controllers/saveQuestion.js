const Questions = require('../models/Questions'); 

exports.saveQuestion = (req, res, next) => {
  const question = new Questions(
    req.body.question_text,
    req.body.answer_text,
    req.body.subject,
    req.body.author_name,
    req.body.education_institute,
    req.body.difficulty_level || 'medium'
  );
  question.addNewQuestion()
    .then(() => {
      res.redirect('/search_questions'); 
    })
    .catch(err => {
      console.error('Error saving question:', err);
      res.status(500).send('Internal Server Error');
    })
};

exports.getAllQuestions = async (req, res, next) => {
  try {
    const [questions] = await Questions.fetchAll();
    res.render('Questions&Answers/search_questions', { questions });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.render('Questions&Answers/search_questions', { questions: [] });
  }
};