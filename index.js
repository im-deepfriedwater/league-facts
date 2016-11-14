'use strict';
var Alexa = require('alexa-sdk');

var APP_ID = undefined; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";
var SKILL_NAME = 'League Facts';
var lastUsedFact = "I have not said a fact yet.";

/**
 * Array containing space facts.
 */
var FACTS = [
    "Four skins have been named after Internet Browsers. They are Firefox Ahri, Explorer Ezreal, Safari Caitlyn, and Chrome Rammus.",
    "The item Total Biscuit of Regeneration is named after popular youtuber and also video game commentator Total Biscuit.",
    "League of Legends was first announced on October 7, 2008. It was released October 27, 2009. As of 2016 it is now a 7 year old game.",
    "SK Telecom is the most recent team to have won worlds in 2016.",
    "In ranked games Blue team is 1.7% statistically more likely to win versus red side.",
    "In NA 0.01% of players are in Challenger as of 2016",
    "In NA 0.04% of players are in Masters 1 as of 2016",
    "In NA 2.10% of players are in Diamond as of 2016",
    "In NA 8.60% of players are in Platnium as of 2016",
    "In NA 26.23% of players are in Gold as of 2016",
    "In NA 39.86% of players are in Silver as of 2016",
    "In NA 23.16% of players are in Bronze as of 2016",
    "Cloud 9's Sneaky's username was originally SneakyCastro until Riot requested he change his name. So he picked Sneaky.",
    "Riot HQ is located in Los Angeles, California in the United States.",
    "Destroying the nexus in a game grants the player 50 gold.",
    "If a player is on a death spree, every 1000 gold earned from creeps or monsters reduces the count of the death spree by 1.",
    "A player's first death is worth 300 gold. A player's 5th death is worth 140. From 10 deaths and on a death is worth 50 gold. Death spree is reset by a player getting a kill.",
    "There are 11 champions that do not have a single AP ratio on any ability. The list is, Darius, Garen, Kalista, Kindred, Illaoi, Olaf, Riven, Talon, Vayne and Zed.",
    "Draven is the only champion that has two different critical strike animations.",
    "Quinn is currently the only champion whose name starts with Q.",
    "That being said, there is a champion for every letter of the alphabet.",
    "The champion Ahri was released globally at the same time of the launch of the Korean server to league.",
    "Originally, Ahri's design did not have fox ears. Her final design does have fox ears.",
    "Ahri was inspired a common symbol in East Asian mythologies, the nine-tailed fox. Foxes in east asian mythology are represented often to fool people and also have the ability to masquerade as a beautiful female human.",
    "Ekko's name was derived from the english word E C H O, echo. The meaning behind is that his past selves from his rewinding of time represent echoes of the timelines he has left behind.",
    "During development Ekko's production titles were Time Slugger and Time Assassain.",
    "Ekko never actually dies, rather through his Zero-Drive he rewinds time back to base.",
    "Orianna is a European name derived from multiple names which mean golden.",
    "Orianna was inspired by Youmu Konpaku from Touhou.",
    "When Taipei Assassins won the Season Two World Championship Riot created TPA Dr. Mundo, Ezreal, Nunu, Shen, and Orianna skins.",
    "The season 1 cash prize for winning worlds was one hundred thousand dollars.",
    "Fnatic back in 2011 known as Fnatic MSI was the first team to win a league worlds championship, winning the Season One championship. ",
    "When SKT won the Season Three World Championship Riot created SKT Jax for Impact, Lee Sin for bengi, Zed for Faker, Vayne for Piglet, and Zyra for PoohManDu",
    "When Samsung White won the Season Four World Championship Riot created Samsung White Singed, Rengar, Talon, Thresh, and Twitch",
    "When SKT T1 won the Season Five World Championship Riot created SKT Renekton, Elise, Azir, Kalista, and Alistar",
    "SKT T1 has won the most world championships, 3 in total. They won the season 3 championship in 2013, the season 5 championship in 2015, and the season 6 championship in 2016.",
    "The Fnatic MSI team at the time that won the season one worlds championship was comprised of xPeke top, Shushei jungle, CyanideFl mid, LamiaZealot ad carry, and Mellisan support",
    "The Taipei Assassains team at the time that won the season two worlds champion was comprised of Stanley top, Liballz jungle, Toyz mid, BeBe ad carry, and Mistake support",
    "The SKT T1 team at the time that won the season three worlds champion was comprised of Impact top, bengi jungle, Faker mid, Piglet ad carry, and PoohManDu support",
    "The Samsung White team at the time that won the season four worlds champion was comprised of Looper top, DanDy jungle, Pawn mid, imp ad carry and mata support.",
    "The SKT T1 team at the time that won the season five worlds champion was comprised of Marin top, bengi and Easyhoon for jungle, Faker mid, Bang ad carry, and wolf and Piccaboo for support.",
    "The SKT T1 team at the time that won the season six worlds champion was comprised of Duke top, Blank jungle, Faker mid, Bang ad carry, and Wolf support",
    "Teemo and Evelynn have the same trait of being the only champions who can be permanently stealthed.",
    "Karma's title The Enlightened One directly references Gautamam Buddha.",
    "There are 7 champions who have more than 4 abilities. They are Elise, Gnar, Heimerdinger, Jayce, Karma, Katarina, Lee Sin and Sivir.",
    "Karma is named after the cause-and-effect principle.",
    "Syndra was originally named Sym.",
    "Syndra is the first official champion to be able to directly manipulate camps and minions to cause damage to other champions.",
    "There are two champions to have quotes when leveling up an ability. There is Syndra with the other being Vayne upon leveling up her Silver Bolts.",
    "Karma and Syndra share the same quote. By force of will.",
    "Lissandra is the only champion to possess a single-target ability that can be used only herself but not on allies."
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        var factIndex = Math.floor(Math.random() * FACTS.length);
        var randomFact = FACTS[factIndex];

        // Create speech output
        var speechOutput = "Here's your fact: " + randomFact;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
        lastUsedFact = randomFact;
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say tell me a League fact, or, you can say exit, you can also ask me to repeat the last fact... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'RepeatIntent': function () {
        this.emit(':tellWithCard', lastUsedFact, reprompt);
    }
};
