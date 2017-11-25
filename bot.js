// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();
const newUsers = new Discord.Collection();
const prefix = '!';
const settings = require('./settings.json');


//Welcoming message

bot.on("guildMemberAdd", (member) => {
  newUsers.set(member.id, member.user);
});

bot.on("guildMemberRemove", (member) => {
  if(newUsers.has(member.id)) newUsers.delete(member.id);
});

bot.on("guildMemberAdd", (member) => {

  console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
  member.addRole(member.guild.roles.find("name", "ExistenZ Rebels")); //add a default role !change the name of the role!
  
    const welcomechannel = member.guild.channels.find('name', 'members_club')

    var embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTitle(':satellite: We have a new member ! :satellite: ')
    .setDescription(' **Hi** ' + member.user + ' **Welcome to ExistenZ** ! ')
    .addBlankField(true)
    .addField(" Here you can find some good mates to play with !", "Mention @Dayz-Team, @7DaysToDie-Team, @PUBG-Team or @Arma3-Team to find them easely.")
    .addField("--> #members_club is the main channel to communicate", "Spam it !:loudspeaker: ")
    .addField("--> Feel free to post your best screenshots", "in #gallery :frame_photo:")
    .addField("--> Share your favorites songs of the moment", "in #music-channel :musical_note: ")
    .addField("--> You want a voice channel for another game ? You have some suggestions to improve our Discord ?", "Go in #questions-suggestions :interrobang: ")
    .addField("--> You are playing a game ? You can ask our bot for a role with the name of the game to be found by other players", "type !help to know how to do it :robot: ")
    .addBlankField(true)
    .addField("7 Days to die server is up and running","if you want to be whitelisted just copy and paste your steam ID in #apply-to-join. (If you don't know how to get your steam id just type !steamID and the bot will help you)")
    .addField("We want to open a DayZ private server !", "If you want to be part of this great adventure, bring your ideas and let us know")
    .addBlankField(true)
    .addField("We also have a steam group that you can join", "http://steamcommunity.com/groups/existenz-community")
    .addField("But above all", "enjoy your stay !")
    .setImage("https://img15.hostingpics.net/pics/980912IMG20170620WA0009.jpg")
    .setFooter("Respect ExistenZ or expect resistance ! --> Admins team : @KaZaR / @sparticus / @BrokeBackBaz")

return welcomechannel.send(embed)

});


// Listener Event: Runs whenever a message is received.
bot.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

    // Purge
    if (msg.startsWith(prefix + 'PURGE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Lets delete the command message, so it doesnt interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find("name", "Admins")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`Admins\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }
});

//Kick command

bot.on("message", (message) => {
    if (message.content.startsWith(prefix + "kick")) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            message.delete()
        // Easy way to get member object though mentions.
        var member= message.mentions.members.first();
        // Kick
        member.kick().then((member) => {
            // Successmessage
            message.channel.send(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
        }).catch(() => {
             // Failmessage
            message.channel.send("Access Denied");
        });
    }
}

});

bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    
    let args = message.content.split(" ").slice(1);
    

    if (command === "steamID") {
        message.delete()
                const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setDescription("Go on your steam profile then right click, copy the page's adress and paste it in #apply-to-join --> easy right ?")
        .setFooter("Respect ExistenZ or expect resistance ! --> Admins team : @KaZaR / @sparticus / @BrokeBackBaz");
        message.channel.send({embed})
    } else


   if (command === "announcement") {
        message.delete()
       if (message.member.hasPermission("ADMINISTRATOR")) {
           const text = args.join(" ")
           if (text.length < 1) return message.channel.send("Can not announce nothing");
           //const colour = args.slice(2).join("");
           const embed = new Discord.RichEmbed()
           .setColor(0x00AE86)
           .setTitle(":satellite: New Announcement! ")
           .setDescription(text)
           .setFooter("Respect ExistenZ or expect resistance ! --> Admins team : @KaZaR / @sparticus / @BrokeBackBaz");
           message.channel.send("@everyone")
           message.channel.send({embed})
       }
   } else


    if (command == "help") {
        message.delete()
        const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTitle("Command List:")
        .addField("!help", "Will give the current command list")
        .addField("!steamID", "Will show you how to get your steam ID to be whitelisted on our servers")
        .addField("7DTDrules","Will display the 7DaysToDie server rules")
        .addField("!announcement [text]", "Will make the bot say an announcement and tag everyone (only Admins can do that)")
        .addField("If you want to add yourself a game role type join[name-of-the-game]team","We currently have : PUBG-Team, Arma3-Team, 7DaysToDie-Team, Dayz-Team. If you want to add one just let us know")
        .setFooter("Respect ExistenZ or expect resistance ! --> Admins team : @KaZaR / @sparticus / @BrokeBackBaz")
        message.channel.send({embed})
    } 

    //rules can be displayed withe "!rules"

    if (command == "7DTDrules") {
        message.delete()
        const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTitle("7 Days to Die rules")
        .addField("#1", "No aggressive behaviour or racism on discord or in game.")
        .addField("#2", "Horde bases are to be build away from villages,towns and cities.")
        .addField("#3", "It is preferred you build your own base and build away from towns and cities to save poi's for looting, houses are allowed.")
        .addField("#4", "The arena is for the gimme and gimmehell game pvp is only allowed in there in events. To play the gimme games type /gimme to win a prize or a zombie! to play gimme hell type /gimmehell and fight your way through 4 waves of zombies! these can only be played in the hours of 6am till 6pm.")
        .addField("#5","Pvp is allowed in certain towns and cities and you will be informed once you enter that area via an in game message,here you can shoot each other all you like with funny in game commentary and earn zennies from player bountys, if you are killed type /return for 100 zennies and you will be teleported back to your bag, anywhere else is pve shoot outside of the pvp area and you will be arrested and sent to jail automatically for 30 minutes (bail is a thousand zennies).")
        .addField("#6","Raiding,stealing and bandits are not allowed loot is to be obtained on your own if the rules are broke you will be arrested see rule 5.")
        .addField("#7","The online shop can only be accessed in Arcadia during 6am to 6pm in game.")
        .addField("#8","No building on roads or bridges these are to be left free for travel.")
        .addField("#9","Players will be rewarded 1 Zennies for every minute played. (exludes new players and isn't retrospective) you will be classed as a new player for 2 days. Zombie kills earn you 10 Zennies.")
        .setFooter("Respect ExistenZ or expect resistance ! --> Admins team : @KaZaR / @sparticus / @BrokeBackBaz")
        message.channel.send({embed})
    }


});


//Bottom

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', () => {

    // We can post into the console that the bot launched.
    console.log('Bot started.');

});

bot.login(settings.token);
