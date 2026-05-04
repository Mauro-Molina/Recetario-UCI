const Recipe = require('../models/Recipe');

// @desc    Obtener todas las recetas (con paginación y búsqueda)
// @route   GET /recipes
exports.getRecipes = async (req, res, next) => {
  try {
    // Paginación
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 6;
    const skip = (page - 1) * limit;

    // Búsqueda
    const search = req.query.search || '';
    const category = req.query.category || '';
    
    let query = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const recipes = await Recipe.find(query)
      .populate('author', 'name')
      .sort('-createdAt')
      .skip(skip)
      .limit(limit);

    const total = await Recipe.countDocuments(query);
    const pages = Math.ceil(total / limit);

    res.render('recipes/index', {
      recipes,
      page,
      pages,
      search,
      category,
      limit
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mostrar formulario de creación
// @route   GET /recipes/new
exports.getNewRecipe = (req, res) => {
  res.render('recipes/new', { error: null });
};

// @desc    Crear nueva receta
// @route   POST /recipes
exports.createRecipe = async (req, res, next) => {
  try {
    const { title, description, ingredients, instructions, category } = req.body;

    // Procesar ingredientes (separados por comas o saltos de línea)
    const ingredientsArray = ingredients.split(/[,\n]+/).map(i => i.trim()).filter(i => i);

    await Recipe.create({
      title,
      description,
      ingredients: ingredientsArray,
      instructions,
      category,
      author: req.user._id
    });

    res.redirect('/recipes');
  } catch (error) {
    res.render('recipes/new', { error: error.message });
  }
};

// @desc    Obtener una receta por ID
// @route   GET /recipes/:id
exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'name');
    
    if (!recipe) {
      res.status(404);
      throw new Error('Receta no encontrada');
    }

    res.render('recipes/show', { recipe });
  } catch (error) {
    next(error);
  }
};

// @desc    Mostrar formulario de edición
// @route   GET /recipes/:id/edit
exports.getEditRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      res.status(404);
      throw new Error('Receta no encontrada');
    }

    // Verificar permisos (solo autor o admin)
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('No autorizado para editar esta receta');
    }

    res.render('recipes/edit', { recipe, error: null });
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar receta
// @route   PUT /recipes/:id
exports.updateRecipe = async (req, res, next) => {
  try {
    let recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      res.status(404);
      throw new Error('Receta no encontrada');
    }

    // Verificar permisos
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('No autorizado para actualizar esta receta');
    }

    const { title, description, ingredients, instructions, category } = req.body;
    
    let ingredientsArray = recipe.ingredients;
    if (ingredients) {
      ingredientsArray = ingredients.split(/[,\n]+/).map(i => i.trim()).filter(i => i);
    }

    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        ingredients: ingredientsArray,
        instructions,
        category
      },
      { new: true, runValidators: true }
    );

    res.redirect(`/recipes/${recipe._id}`);
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar receta
// @route   DELETE /recipes/:id
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      res.status(404);
      throw new Error('Receta no encontrada');
    }

    // Verificar permisos
    if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403);
      throw new Error('No autorizado para eliminar esta receta');
    }

    await recipe.deleteOne();

    res.redirect('/recipes');
  } catch (error) {
    next(error);
  }
};
