const {Router} = require('express');

const{
    pokemonsDelete,
    pokemonsGet,
    pokemonsPatch,
    pokemonsPut,
    pokemonsPost
} = require('../controllers/pokemons');

const router = Router();
const { validateJWT } = require('../middlewares/validate-jwt');

router.get('/', pokemonsGet);
router.post('/', validateJWT, pokemonsPost);
router.put('/:id', validateJWT, pokemonsPut);
router.patch('/:id', validateJWT, pokemonsPatch);
router.delete('/:id', validateJWT, pokemonsDelete);

module.exports = router;