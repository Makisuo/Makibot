const Discord = require('discord.js')
const config = require("./configs/makiowo.json");
const client = new Discord.Client()

const overwatch = require("./configs/dummy.json")

const map_Images = require("./configs/map_images.json");



const defaultJS = require('./configs/default.json');



client.on('ready', () => {
  console.log("Connected as " + client.user.tag)
  client.user.setActivity("Hentai", {
    type: "WATCHING"
  })
  // List servers the bot is connected to
  console.log("Servers:")
  client.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
  })
  //apiCall("Makisuo-2301", "eu");
})


//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes
//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes//TriggerOnEmotes


client.on('messageReactionAdd', (reaction, user) => {
  console.log(`${user.username} reacted with "${reaction.emoji.name}".`);
  switch (reaction.emoji.name) {
    case anubis:

      break;
    default:
      return

  }
});

client.on('messageReactionRemove', (reaction, user) => {
  console.log(`${user.username} removed their "${reaction.emoji.name}" reaction.`);
});



const events = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {
  if (!events.hasOwnProperty(event.t)) return;
  const {
    d: data
  } = event;
  const user = client.users.get(data.user_id);
  const channel = client.channels.get(data.channel_id) || await user.createDM();

  if (channel.messages.has(data.message_id)) return;

  const message = await channel.fetchMessage(data.message_id);

  const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
  let reaction = message.reactions.get(emojiKey);

  if (!reaction) {
    // Create an object that can be passed through the event like normal
    const emoji = new Discord.Emoji(client.guilds.get(data.guild_id), data.emoji);
    reaction = new Discord.MessageReaction(message, emoji, 1, data.user_id === client.user.id);
  }

  client.emit(events[event.t], reaction, user);
});




//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage
//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage
//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage//onMessage

client.on('message', (receivedMessage) => {
  if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
    return
  }

  if (receivedMessage.content.startsWith(config.prefix)) {
    commandHandler(receivedMessage)
  }
})

function commandHandler(receivedMessage) { //// TODO: Öffnen durch Reaktionen
  let fullCommand = receivedMessage.content.substr(1); // Remove the leading exclamation mark
  let splitCommand = fullCommand.split(" "); // Split the message up in to pieces for each space
  let primaryCommand = splitCommand[0]; // The first word directly after the exclamation is the command
  let arguments = splitCommand.slice(1); // All other words are arguments/parameters/options for the command

  console.log("Command received:" + primaryCommand)
  console.log("arguments:" + arguments)
  console.log("User:" + receivedMessage.author.toString())
  try {
    console.log("Server:" + receivedMessage.guild.name)
  } catch (e) {
    console.log("Private DM");
  }

  if (primaryCommand == "win") {
    addGameOw(arguments, receivedMessage, primaryCommand)
  }
  if (primaryCommand == "lose") {
    addGameOw(arguments, receivedMessage, primaryCommand)
  }
  if (primaryCommand == "owcreate") {
    newUser(receivedMessage)
  }
  if ((primaryCommand == "stats")) {
    console.log(arguments[1]);
    stats(arguments, receivedMessage)
  }
  if (primaryCommand == "setBattleTag") {
    setBattleTag(arguments, receivedMessage)
  }
  if (primaryCommand == "region") {
    setRegion(arguments, receivedMessage);
  }
}

function writeToFile(receivedMessage) {
  var authorUser = receivedMessage.author.toString().substr(2);
  authorUser = authorUser.substr(0, authorUser.length - 1)
  var fs = require('fs');
  var fileName = './userData/' + authorUser + '.json';
  var file = require(fileName);



  fs.writeFile(fileName, JSON.stringify(file, null, 2), function(err) {
    if (err) return console.log(err);
    console.log('writing to ' + fileName);
  });
}

function createNewFile(receivedMessage, data, folder) {
  var dictstring = JSON.stringify(data);
  var fs = require('fs');
  console.log(receivedMessage.author.toString())
  var authorUser = receivedMessage.author.toString().substr(2);
  authorUser = authorUser.substr(0, authorUser.length - 1)
  fs.writeFile(folder + authorUser + ".json", dictstring, function(err, dictstring) {
    if (err) {
      return console.error(err);
    }
    console.log("New File successfully created");
  });
}

function newUser(receivedMessage) {
  var newuser = defaultJS;
  createNewFile(receivedMessage, newuser, "./userData/")
  receivedMessage.channel.send("Sucess!" + receivedMessage.author.toString() + ", you're successfully registered now and can use \n `!win [map]` or `!lose [map]` HF :stuck_out_tongue_closed_eyes: ")

  //console.log(newuser)

}



function addGameOw(arguments, receivedMessage, primaryCommand) {
  if (!(receivedMessage.channel.name == "overwatch")) {
    receivedMessage.channel.send("Bitte geh in den Channel " + "#overwatch" + " für Commands des Overwatch Bot's")
    return
  }
  if (getUserFile(receivedMessage) == false) {
    return;
  }


  if (primaryCommand === "win") {
    switch (arguments[0].toLowerCase()) {
      case "anubis":
        owADD(0, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 0)
        break;
      case "hanamura":
        owADD(1, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 1)
        break;
      case "horizon":
        owADD(2, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 2)
        break;
      case "volskaya":
        owADD(3, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 3)
        break;
      case "gibralta":
        owADD(4, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 4)
        break;
      case "dorado":
        owADD(5, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 5)
        break;
      case "junkertown":
        owADD(6, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 6)
        break;
      case "route66":
        owADD(7, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 7)
        break;
      case "lijiang":
        owADD(8, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 8)
        break;
      case "ilios":
        owADD(9, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 9)
        break;
      case "nepal":
        owADD(10, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 10)
        break;
      case "oasis":
        owADD(11, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 11)
        break;
      case "blizzardworld":
        owADD(12, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 12)
        break;
      case "eichenwalde":
        owADD(13, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 13)
        break;
      case "kingsrow":
        owADD(14, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 14)
        break;
      case "numbani":
        owADD(15, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 15)
        break;
      case "hollywood":
        owADD(16, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 16)
        break;
      case "busan":
        owADD(17, receivedMessage, true)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 17)
        break;
      default:
        receivedMessage.channel.send(arguments[0] + " ist keine Overwatch Map! Versuch es mit !win " + overwatch.maps[3].name + " z.B");
        break;
    }
  } else {
    switch (arguments[0]) {
      case "anubis":
        owADD(0, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 0)
        break;
      case "hanamura":
        owADD(1, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 1)
        break;
      case "horizon":
        owADD(2, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 2)
        break;
      case "volskaya":
        owADD(3, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 3)
        break;
      case "gibralta":
        owADD(4, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 4)
        break;
      case "dorado":
        owADD(5, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 5)
        break;
      case "junkertown":
        owADD(6, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 6)
        break;
      case "route66":
        owADD(7, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 7)
        break;
      case "lijiang":
        owADD(8, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 8)
        break;
      case "ilios":
        owADD(9, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 9)
        break;
      case "nepal":
        owADD(10, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 10)
        break;
      case "oasis":
        owADD(11, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 11)
        break;
      case "blizzardworld":
        owADD(12, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 12)
        break;
      case "eichenwalde":
        owADD(13, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 13)
        break;
      case "kingsrow":
        owADD(14, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 14)
        break;
      case "numbani":
        owADD(15, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 15)
        break;
      case "hollywood":
        owADD(16, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 16)
        break;
      case "busan":
        owADD(17, receivedMessage, false)
        writeToFile(receivedMessage)
        owAlert(arguments, receivedMessage, primaryCommand, 17)
        break;
      default:
        receivedMessage.channel.send(arguments[0] + " is not an Overwatch map! Try " + overwatch.maps[3].name + "instead");
        break;
    }
  }
}

function owAlert(arguments, receivedMessage, primaryCommand, mapID) {

  const overwatch = getUserFile(receivedMessage)

  let winrate = ((overwatch.maps[mapID].win[0]) / (overwatch.maps[mapID].total[0])) * 100;

  receivedMessage.channel.send({
    embed: {
      color: 11695294,
      author: {
        name: client.user.username,
        icon_url: client.user.avatarURL
      },
      title: "Map: " + overwatch.maps[mapID].name,
      description: "Stats for:" + receivedMessage.author.toString(),
      fields: [{
          name: "Total Games:",
          value: overwatch.maps[mapID].total[0]
        },
        {
          name: "Wins:",
          value: overwatch.maps[mapID].win[0]
        },
        {
          name: "Loses:",
          value: overwatch.maps[mapID].loses[0]
        },
        {
          name: "Longest Streaks:",
          value: "Longest Winstreak: " + overwatch.maps[mapID].longest_win_streak[0] + "\nLongest Losestreak: " + overwatch.maps[mapID].longest_lose_streak[0]
        },
        {
          name: "Streak RN:",
          value: winStreakCalc(receivedMessage)
        },
        {
          name: "New Winrate:",
          value: parseFloat(Math.round(winrate * 100) / 100).toFixed(2) + "%"
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "© Makisuo"
      }
    }
  });
}

function owADD(mapID, receivedMessage, gameEnding) {

  const overwatch = getUserFile(receivedMessage)

  if (gameEnding == true) {
    overwatch.lose_streak = 0;
    overwatch.win_streak++;
    overwatch.maps[mapID].win[0] = overwatch.maps[mapID].win[0] + 1;
    overwatch.maps[mapID].win_streak[0] = overwatch.maps[mapID].win_streak[0] + 1;
    if (overwatch.maps[mapID].lose_streak[0] > overwatch.maps[mapID].longest_lose_streak[0]) {
      overwatch.maps[mapID].longest_lose_streak[0] = overwatch.maps[mapID].lose_streak[0]
    }
    overwatch.maps[mapID].lose_streak[0] = 0;
  }
  if (gameEnding == false) {
    overwatch.win_streak = 0;
    overwatch.lose_streak++;
    overwatch.maps[mapID].loses[0] = overwatch.maps[mapID].loses[0] + 1;
    overwatch.maps[mapID].lose_streak[0] = overwatch.maps[mapID].lose_streak[0] + 1;
    if (overwatch.maps[mapID].win_streak[0] > overwatch.maps[mapID].longest_win_streak[0]) {
      overwatch.maps[mapID].longest_win_streak[0] = overwatch.maps[mapID].win_streak[0]
    }
    overwatch.maps[mapID].win_streak[0] = 0;
  }

  overwatch.maps[mapID].total[0] = overwatch.maps[mapID].total[0] + 1;
  overwatch.gamesplayed++;
}


function getUserFile(receivedMessage) {
  var authorUser = receivedMessage.author.toString().substr(2);
  authorUser = authorUser.substr(0, authorUser.length - 1)
  try {
    const overwatch = require("./userData/" + authorUser + ".json");
    return overwatch;
  } catch (err) {
    //console.log(err);
    receivedMessage.channel.send(receivedMessage.author.toString() + " please initialize your username first by typing `!owcreate`");
    return false;
  }
}

function callMeWhenDOne(receivedMessage) {
  console.log()
  const embed = new Discord.RichEmbed()
    .setTitle("Map: " + arguments[1])
    .setAuthor(client.user.username, receivedMessage.author.avatarURL)
    .setColor(0x00AE86)
    .setDescription("Stats for " + receivedMessage.author.toString() + " on " + arguments[1])
    .setFooter("This is a cool Text that has to be replaced © Makisuo", client.user.avatarURL)
    .setImage(map_Images.default[0])
    .setThumbnail(client.user.avatarURL)
    /*
     * Takes a Date object, defaults to current date.
     */
    .setTimestamp()
    .addField("Wins: Loses:",
      "amount wins and loses")
    /*
     * Inline fields may not display as inline if the thumbnail and/or image is too big.
     */
    .addField("Winrate", "Winrate& Games", true)
    /*
     * Blank field, useful to create some space.
     */
    .addBlankField(true)
    .addField("IDK", true);

  receivedMessage.channel.send({
    embed
  });
}

async function stats(arguments, receivedMessage, callback) {
  const overwatch = getUserFile(receivedMessage);

  if (overwatch.battle_tag == "") {
    if(overwatch.region == ""){
      receivedMessage.channel.send("Pls set your BattleTag first with `!setBattleTag username-12345` \n And your Region with `!region eu");
      return;
    }
    else{
      receivedMessage.channel.send("Pls set your BattleTag first with `!setBattleTag username-12345`");
      return;
    }
  }

  if (overwatch.region == "") {
    receivedMessage.channel.send("Pls set your Region first with `!region eu`");
    return;
  }
  const owJson = await apiCall(overwatch.battle_tag, overwatch.region, receivedMessage);
  receivedMessage.channel.send("Deine Stats nibba")
  callMeWhenDone(receivedMessage);

}

function winStreakCalc(receivedMessage) {
  const overwatch = getUserFile(receivedMessage);
  if (overwatch.win_streak > overwatch.lose_streak) {
    return overwatch.win_streak;
  } else if (overwatch.win_streak < overwatch.lose_streak) {
    return overwatch.lose_streak * (-1);
  }
}

function apiCall(username, region, receivedMessage) {
  const request = require('request');

  request("https://ow-api.com/v1/stats/pc/" + region + "/" + username + "/profile", {
    json: true
  }, (err, res, owJson) => {
    if (err) {
      return console.log(err);
    }
    console.log(owJson);
    createNewFile(receivedMessage, owJson, "./ingameStatsPlayers/");
    writeToFile(receivedMessage);
    return owJson;
  });
}

function setBattleTag(arguments, receivedMessage) {
  if (arguments[0].includes('#')) {
    receivedMessage.channel.send(receivedMessage.author.toString() + ", the right syntax for your BattleTag is: Username-12345 etc.")
    return;
  }
  if (getUserFile(receivedMessage) == false) {
    return;
  }

  const overwatch = getUserFile(receivedMessage);
  overwatch.battle_tag = arguments[0];
  writeToFile(receivedMessage);
  receivedMessage.channel.send("You successfully set your BattleTag to: " + "`" + arguments[0] + "`");
}

function setRegion(arguments, receivedMessage) {
  if (arguments[0] == "eu" || arguments[0] == "na" || arguments[0] == "asia") {
    const overwatch = getUserFile(receivedMessage);
    overwatch.region = arguments[0];
    writeToFile(receivedMessage);
    receivedMessage.channel.send("You successfully set your Region to: " + "`" + arguments[0] + "`");
  }
}


client.login(config.token)
