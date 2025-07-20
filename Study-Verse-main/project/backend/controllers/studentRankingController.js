const User = require('../models/User');
const QuizResult = require('../models/QuizResult');
const LoginLog = require('../models/LoginLog');
const Transaction = require('../models/Transaction');

const W1 = 0.4;
const W2 = 0.2;
const W3 = 0.1;
const W4 = 0.2;
const W5 = 0.1;

const getStudentScores = async (req, res) => {
  try {
    const users = await User.find();

    const quizScoresArr = [];
    const timeSpentArr = [];
    const coursesTakenArr = [];
    const completionRateArr = [];
    const engagementArr = [];
    const allData = [];

    for (let user of users) {
      const quizzes = await QuizResult.find({ user: user.email });
      const quizScore = quizzes.length ? quizzes.reduce((sum, q) => sum + q.score, 0) / quizzes.length : 0;

      const logs = await LoginLog.find({ email: user.email });
      const totalTime = logs.reduce((sum, log) => {
        if (log.loginTime && log.logoutTime) {
          return sum + (new Date(log.logoutTime) - new Date(log.loginTime));
        }
        return sum;
      }, 0);

      const transactions = await Transaction.find({ user: user._id });
      const coursesTaken = transactions.length;
      const completedCourses = user.coursesCompleted ? user.coursesCompleted.length : 0;
      const completionRate = coursesTaken > 0 ? (completedCourses / coursesTaken) * 100 : 0;

      const engagement = user.engagementScore || 0;

      quizScoresArr.push(quizScore);
      timeSpentArr.push(totalTime);
      coursesTakenArr.push(coursesTaken);
      completionRateArr.push(completionRate);
      engagementArr.push(engagement);

      allData.push({
        user,
        quizScore,
        totalTime,
        coursesTaken,
        completionRate,
        engagement
      });
    }

    const normalize = (arr) => {
      const max = Math.max(...arr);
      return max === 0 ? arr.map(() => 0) : arr.map(val => (val / max) * 100);
    };

    const normQuiz = normalize(quizScoresArr);
    const normTime = normalize(timeSpentArr);
    const normCourses = normalize(coursesTakenArr);
    const normComplete = normalize(completionRateArr);
    const normEngage = normalize(engagementArr);

    const ranked = allData.map((item, i) => {
      const finalScore = (
        W1 * normQuiz[i] +
        W2 * normTime[i] +
        W3 * normCourses[i] +
        W4 * normComplete[i] +
        W5 * normEngage[i]
      );
      return {
        userId: item.user._id,
        name: item.user.name,
        email: item.user.email,
        finalScore: Number(finalScore.toFixed(2))
      };
    });

    ranked.sort((a, b) => b.finalScore - a.finalScore);
    res.json(ranked);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch student rankings' });
  }
};

module.exports = { getStudentScores };
