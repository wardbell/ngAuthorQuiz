(function(){
	angular.module('app').service('GameService', GameService);

	function GameService() {
        var data = getData();

		var svc = this;
		svc.selectGame  = selectGame;
		svc.addNextGame = addNextGame;

		//////////////
		// Logic straight from Liam McLennan "React Fundamentals"
		function selectGame(){

			var books = _.shuffle(data.reduce(function(p, c, i) {
				return p.concat(c.books);
			}, [])).slice(0,4);

			var answer = books[_.random(books.length-1)];

			var author =  _.find(data, 
				function(author){
					return author.books.some(function (title){
						return title === answer;
				});
			});

			var game = {
				author: author,				
				books: books,
				checkAnswer: function(title){
					return game.author.books.some(function(t){
						return t === title;
					});
				}
			}
			return game;
		}

		// Make this the next game, then revert to game generation
		function addNextGame(game){
			svc.selectGame = function(){
				svc.selectGame = selectGame;
				return game;
			}
		}

		// Liam McLennan's data
		function getData() {
			var data = [
			{
				name: 'Mark Twain',
				imageUrl: 'images/Mark_Twain.jpg',
				imageSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg/400px-Mark_Twain%2C_Brady-Handy_photo_portrait%2C_Feb_7%2C_1871%2C_cropped.jpg',
				books:['The Adventures of Huckleberry Finn']
			},
			{
				name: 'Joseph Conrad',
				imageUrl: 'images/Joseph_Conrad.png',
				imageSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Joseph_Conrad.PNG/350px-Joseph_Conrad.PNG',
				books:['Heart of Darkness']
			},
			{
				name: 'J.K. Rowling',
				imageUrl: 'images/JK_Rowling.jpg',
				imageSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/J._K._Rowling_2010.jpg/440px-J._K._Rowling_2010.jpg',
				books:['Harry Potter and the Sorcerers Stone']
			},
			{
				name: 'Stephen King',
				imageUrl: 'images/Stephen_King.jpg',
				imageSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Stephen_King%2C_Comicon.jpg/440px-Stephen_King%2C_Comicon.jpg',
				books:['The Shining', 'IT']
			},
			{
				name: 'Charles Dickens',
				imageUrl: 'images/Charles_Dickens.jpg',
				imageSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Dickens_Gurney_head.jpg/440px-Dickens_Gurney_head.jpg',
				books:['David Copperfield', 'A Tale of Two Cities']
			},
			{
				name: 'William Shakespeare',
				imageUrl: 'images/William_Shakespeare.jpg',
				imageSrc: 'http://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Shakespeare.jpg/500px-Shakespeare.jpg',
				books:['Hamlet', 'Macbeth', 'Romeo and Juliet']
			}
			];

			if (false){ // true = deployed in plunker
				data.forEach(function(a){ a.imageUrl = a.imageSrc; })
			}
			return data;
		}
	}

})();
