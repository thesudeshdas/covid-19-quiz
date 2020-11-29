// get required packages
var Table = require('cli-table');
var readlineSync = require('readline-sync');
const chalk = require('chalk');

// chalk package used frequently for colouring
const correct = chalk.black.bold.bgRgb(104, 255, 74);
const incorrect = chalk.bold.bgRgb(255, 74, 74);
const inverse = chalk.inverse.bold;
const questionColor = chalk.bold.black.bgRgb(3, 252, 252);
const title = chalk.underline.bold;
const scoreColor = chalk.bgWhite.bold.black;

// global variables
let score = 0, highScore = 7;
const questionBank = [
    {
        question: 'What pandemic is going on right now in the world?',
        options: ['COVID-19', 
                'Swine Flu', 
                'There\'s a pandemic going on?'],
        comments: ['Looks like your knowledge is good.', 
                'You\'re a little bit late, it happened in 2009.', 
                'Seriously? Have you been living in a cave?'],
        answer: 0,
    },
    {
        question: 'What is the full form of PPE?',
        options: ['Philadelphia Presidential Election', 
                'Personal Protective Equipment', 
                'Pre-Participation Evaluation'],
        comments: ['Come on, really? Joe Biden has already won. Stop watching election now.', 
                'Oh Yeah, Seems you are intelligent. Keep it up.', 
                'Come on, get out of your olympic dreams, its postponed'],
        answer: 1,
    },
    {
        question: 'Who is the director general of WHO?',
        options: ['Dr. Tedros Adhanom', 
                'Mukesh Ambani', 
                'Karan Johar'],
        comments: ['Excellent. Good going.', 
                'IPL season is over, my dear friend.', 
                'No, it\'s not bollywood, it is a world ending pandemic, keep up.'],
        answer: 0,
    },
    {
        question: 'How many seconds should you wash your hands for?',
        options: ['1 hour sounds good', 
                'No need to wash', 
                'At least 20 seconds'],
        comments: ['Not that long. You can\'t spend whole day just washing hands.', 
                'No, Seriously? You think this is a joke?', 
                'Correct, with awesome people like you, we\'ll fight this in no time.'],
        answer: 2,
    },
    {
        question: 'Where should you wear the mask?',
        options: ['Over the eyes', 
                'Covering the mouth and nose', 
                'Just keep it in pocket, in case someone wants'],
        comments: ['Exactly, what you can\'t see, does  not exist.', 
                'Very good, you seem like an expert.', 
                'You are a Harry Potter fan for sure, you believe in magic.'],
        answer: 1,
    },
    {
        question: 'What is social distancing?',
        options: ['Being social (friends) with distanced people', 
                'Keeping a distance of at least 3 feet from other people', 
                'Say no to distancing'],
        comments: ['Good initiative, but make sure to keep distance.', 
                'Hell Yeah! Keep on answering such awesomely.', 
                'Uhhh, no. Maintain distance, please. It\'s a world ending pandemic.'],
        answer: 1,
    },
    {
        question: 'What\'s the update on vaccine?',
        options: ['Many organisations are working towards creating one', 
                'I\'ve already been vaccinated', 
                'Vaccine? What for?'],
        comments: ['You\'re intelligent, I appreciate your knowledge', 
                'Please, let me know how? We all need it desperately.', 
                'You are living in a cave for sure.'],
        answer: 0,
    },
    {
        question: 'What are the symptoms of coronavirus?',
        options: ['What symptoms? Corona is just a beer.', 
                'Cancer? HIV? Something big like these?', 
                'Cough, fever, tiredness and breathing problems'],
        comments: ['Okay, now I have to say, you are an idiot.', 
                'Nope, not those, symptoms are always easily avoided.', 
                'Absolutely correct, my friend. Make sure to get yourself checked if you have any symptoms.'],
        answer: 2,
    },
    {
        question: 'How many people have died due to this virus worldwide?',
        options: ['Around 10?', 
                'Roughly 1.3 million', 
                'No deaths, it is all fake'],
        comments: ['Stop counting your fingers. It\'s not ad of GoodNight', 
                'Yeah, make sure to keep your loved ones safe in this difficult times.', 
                'You are living in fantasy, are not you?'],
        answer: 1,
    },
    {
        question: 'When did the coronavirus end?',
        options: ['It is still going on', 
                'Early 2020?', 
                'It never started'],
        comments: ['Exactly, stay home, stay safe.', 
                'Hell na, stop going outside without any reasons.', 
                'Okay, you must be one of them who don\'t believe in virus. Please, Stay Home.'],
        answer: 0,
    },
]

// frequently & commonly used functions
const log = console.log;

function separator() { log(chalk.bold('\n--------------------------------------------------------\n')); };

const showScore = () => { log(`Your current ${scoreColor(` score is ${score} `)}`); };

// functions to be used
const askQuestion = (serial, question, options, answer, comments) => {
    log(questionColor(` ${serial}- ${question} `));
    const userChoice = readlineSync.keyInSelect(options, 'Choose an option', {cancel: false});

    if (userChoice == answer) {
        log(correct(`\n You chose the correct option: ${options[userChoice]} \n ${comments[userChoice]} \n`));
        score += 1;
    } else {
        log(incorrect(`\n You chose the incorrect option: ${options[userChoice]} \n ${comments[userChoice]} \n`));
        log(correct(` The correct option is: ${options[answer]} \n`))
    }
};

const checkHighScoreBeaten = () => {
    if (score > highScore) {
        log(`Congratulations, you beat the high score. The new  ${scoreColor(` high score is ${score}. `)}\nDo send a screenshot of your score. My instagram and twitter handle is - ${scoreColor(` @thesudeshdas `)}\n\n`);
    } else {
        log(`Thank you for playing. Your final score is ${score}\n\n`);
    }
};

const showScoreBoard = () => {
    const table = new Table({
        head: [scoreColor('Sl No.'),scoreColor('Player'), scoreColor('Score')],
        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
    });

    table.push(
        ['1','Suraj', '9'],
        ['2','Dash', '7'],
        ['3','Sudesh', '6'],
    );

    log(title('Here\'s the cureent high score board:-\n'))
    log(table.toString());
};

const game = () => { 
    // loop questions
    for(let i = 0; i < questionBank.length; i++) {
        askQuestion(i+1, questionBank[i].question, questionBank[i].options, questionBank[i].answer, questionBank[i].comments);
        showScore();
        separator()
    }

    checkHighScoreBeaten();
    showScoreBoard();
};

// welcome message
let userName = readlineSync.question('Hi there! May I know your name please?\n');
log(`\nHello ${inverse(` ${userName}! `)} It\'s nice to meet you.`);
separator();

// game instruction
log(`Let\'s test your ${title('knowledge of COVID-19')}, shall we?`);
log(`\n${title(' Here are your instructions:- ')}\n`);
log(`1. There are a total of 10 questions.\n2. Each correct answer gets you one point, there\'s no penalty for incorrect answers.\n3. Just type 1, 2, or 3 to select the options.`);

if (readlineSync.keyInYN(`\nPress y when you are ready to take the quiz.`)) {
    log(`${correct(' All the Best ')}`);
    separator();
    game();
} else {
    log('Uh Oh! Looks like you\'re not ready. Please refresh the page.')
    separator();
}