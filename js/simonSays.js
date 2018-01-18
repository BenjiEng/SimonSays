//Simon namespace
var Simon = {
	//public variables
	sequence: [],
	round: 0,
	highscore: 0,
	active: true,
	pointer: 0,

	// entry point to initalize class
	initSimon: function() {
		var self = this;
		$('#start').on('click', function() {
			self.startGame();
		});
	},

	// starts the game
	startGame: function() {
		this.sequence = [];
		this.round = 0;
		this.active = true;
		$("#lose").hide();
		this.newRound();
	},

	// handles new round
	newRound: function() {
		var self = this;

		$('[data-round]').text(++self.round);

		self.preventInput();
		self.sequence.push(self.generateNumber());
		self.animate(self.sequence);
		self.pointer = 0;
		self.allowInput();
	},


	//Helper Functions//

	// allow user to interact with the game
	allowInput: function() {
		var self = this;
		$(".simon .tile").unbind().click(function (e) {
			self.handleClick(e);
		});

		$(".simon .tile").mousedown(function (e) {
			$(this).addClass('lit');
		});

		$(".simon .tile").mouseup(function (e) {
			$(this).removeClass('lit');
		});

		$('[data-tile]').addClass('hoverable');
	},

	// prevent user from interacting until sequence is done animating
	preventInput: function() {
		var self = this;
		$('.simon')
			.off('click', '[data-tile]')
			.off('mousedown', '[data-tile]')
			.off('mouseup', '[data-tile]');

		$('[data-tile]').removeClass('hoverable');
	},

	// handles the click
	handleClick: function(e) {
		var self = this;
		var clickValue = $(e.target).data('tile');
		self.checkGame(clickValue);
	},

	// checks the value against the pointer
	checkGame(clickValue) {
		var self = this;
		//handle correct click;		
		if (self.sequence[self.pointer] === clickValue) {
			self.pointer += 1;
		//handle incorrect click;
		} else {
			self.preventInput();
			if (self.round > self.highscore) {
				self.highscore = self.round;
				$('[data-highscore]').text(self.highscore);
			}
			$("#lose").show();
		}

		//check if we are at end of the sequence
		if (self.pointer === self.sequence.length) {
			self.newRound()
		}
	},

	// Animates the sequence
	animate: function(sequence) {
		var self = this;
		var i = 0;
		var interval = setInterval(function() {
			self.animateButton(sequence[i]);
			i++;
			if (i >= sequence.length) {
				clearInterval(interval);
				self.allowInput();
			}
		}, 800);
	},

	// Animates the button
	animateButton: function(tile) {
		var $tile = $('[data-tile=' + tile + ']').addClass('lit');
		window.setTimeout(function() {
			$tile.removeClass('lit');
		}, 400);
	},

	// Generates random number
	generateNumber: function() {
		// between 1 and 4
		return Math.floor((Math.random()*4)+1);
	}
};
