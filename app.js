(function() {

	angular
		.module('app', ['ngRoute'])
		.controller('Quiz', Quiz)
		.controller('AddGameForm', AddGameForm)
		.config(routerConfig)
		.run(routerStart);


	function Quiz($location, GameService) {
		var vm = this;
		nextGame();

		function nextGame(){
			vm.addGame      = addGame;
			vm.game         = GameService.selectGame();
			vm.correctness  = 'neutral';
			vm.nextGame     = nextGame;
			vm.selectAnswer = selectAnswer;
			vm.showContinue = false;
		}

		function addGame(){
			$location.path('addGame');
		}

		function selectAnswer(title){
			var isCorrect   = vm.game.checkAnswer(title);
			vm.correctness  = isCorrect ? 'pass' : 'fail';
			vm.showContinue = isCorrect;
		}
	}




	function AddGameForm($location, GameService){
		var vm = this;
		vm.game = {
			imageUrl: '',
			books:   ['','','',''],
			checkAnswer: function(){return true;} // they're all good :-)
		};
		vm.submit = submit;

		function submit(){
			GameService.addNextGame(vm.game);
			$location.path('/');
		}
	}




	function routerConfig($routeProvider){
	    $routeProvider.
	      when('/',        { templateUrl: 'quiz.html' }).     // view specifies controller
	      when('/addGame', { templateUrl: 'addGameForm.html', // router specifies controller
	      	                 controller:  'AddGameForm',  
	      	                 controllerAs: 'vm'}).
	      otherwise(       { redirectTo: '/' });
	}


	function routerStart($location, $rootScope, $route){
		// Must inject $route service to get 1st route on start
		// Diagnostics (optional):

	    $rootScope.$on('$routeChangeSuccess',
	        function (event, current, previous) {
	        	console.log('Route changed to '+ current.$$route.originalPath);
	        }
	    );

	    $rootScope.$on('$routeChangeError',
	        function (event, current, previous, rejection) {
	            var msg = 'Routing error: ' + (rejection.msg || '');
	            $location.path('/');
	        }
	    );          
	}

})();