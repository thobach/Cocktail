/**
 * Setup Views
 */
var tabGroup = Titanium.UI.createTabGroup();

// --- general --- //
var recipeScrollView = Titanium.UI.createScrollableView({
    showPagingControl: false
});

// --- cocktails --- //
var cocktailWindow = Titanium.UI.createWindow({  
    titleid:'cocktails',
    url:'views/cocktails.js'
});

if(Titanium.Platform.osname == 'ipad'){
	cocktailWindow.navBarHidden = true;
}

var cocktailTab = Titanium.UI.createTab({  
    icon:'images/tab_cocktails_small_white.png',
    title:L('cocktails','Cocktails'),
    window:cocktailWindow
});
cocktailWindow.tab = cocktailTab;
tabGroup.addTab(cocktailTab);

// --- random cocktails --- //
var randomWindow = Titanium.UI.createWindow({
	titleid : 'random_title',
	url: 'views/random.js'
});
var randomTab = Titanium.UI.createTab({
	icon : 'images/tab_shaker_small_white.png',
	titleid : 'random_tab',
	window : randomWindow
});
randomWindow.tab = randomTab;
tabGroup.addTab(randomTab);

/**
 * Setup Data
 */

function Cocktail (){
	this.recipesJson;
	this.ingredientsJson;
	this.recipes;
	this.glasses;
	this.photos;
	this.videos;
	this.ingredients;
	this.ingredientCategories;
	this.recipeScrollView;
}

var CocktailApp = new Cocktail();

Ti.include('model/component.js');
Ti.include('model/glass.js');
Ti.include('model/recipe.js');
Ti.include('model/photo.js');
Ti.include('model/ingredient.js');
Ti.include('model/video.js');

if(Titanium.Locale.currentLanguage == 'de'){
	Ti.include('data/recipes_de.js');
	Ti.include('data/ingredients.js');
} else {
	Ti.include('data/recipes.js');
	Ti.include('data/ingredients.js');
}

CocktailApp.recipeScrollView = recipeScrollView;

CocktailApp.recipesJson = recipesJson.recipes;
CocktailApp.ingredientsJson = ingredientsJson.ingredients;

CocktailApp.glasses = Glass.getGlasses(CocktailApp.recipesJson, CocktailApp.glasses);
CocktailApp.recipes = Recipe.getRecipes(CocktailApp.recipesJson, CocktailApp.glasses);
CocktailApp.photos = Photo.getPhotos(CocktailApp.recipesJson);
CocktailApp.videos = Video.getVideos(CocktailApp.recipesJson);
var ingredientsAndCategories = Ingredient.getIngredients(CocktailApp.ingredientsJson);
CocktailApp.ingredients = ingredientsAndCategories.ingredients;
CocktailApp.ingredientCategories = ingredientsAndCategories.ingredientCategories;

cocktailWindow.app = CocktailApp;
randomWindow.app = CocktailApp;

tabGroup.open();
