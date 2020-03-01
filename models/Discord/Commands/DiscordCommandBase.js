const DiscordCommand = require('../DiscordCommand.js');

class DiscordCommandBase extends DiscordCommand {

  constructor(subsystem) {
    super("base", "Check the base price of an item", subsystem);
  }

  onRun(message, args) {
	args.shift();
	let config = this.subsystem.manager.getSubsystem("Config").config;
    if(args.length < 4) {
		message.channel.send("Usage is `" + config.discord_command_character + "base [price] [fee] [price2] [fee2]`");
		return;
	}
	let currentPrice = 1
	let i = 1
	let checks = 0
	while(currentPrice < 25000000) {
		var fee = Math.round(this.calculateFee(currentPrice, args[0]));
		let fee2 = 0
		if(fee == args[1]) {
			fee2 = Math.round(this.calculateFee(currentPrice, args[2]));
			if(fee2 == args[3]) {
				message.channel.send("The base price is: " + currentPrice);
				return;
			}
		}
		currentPrice++;
	}
	message.channel.send("Limit of 25000000 exceeded");
	
	
	
  }
  
  calculateFee(v0, vr) {
	let p0 = Math.abs(Math.log10(v0/vr));
	if(v0 < vr) {
	  p0 = 0 - Math.pow(p0, 1.08)    
	}
	let pr = Math.abs(Math.log10(vr/v0));
	if(v0 >= vr) {
		pr = 0 - Math.pow(pr, 1.08)
	}
	let part1 = v0*0.025*(Math.pow(4, p0))
	let part2 = vr*0.025*(Math.pow(4, pr))
	return part1 + part2
  }

}

module.exports = DiscordCommandBase;