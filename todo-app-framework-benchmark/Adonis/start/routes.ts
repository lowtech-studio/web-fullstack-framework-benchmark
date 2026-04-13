import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', [controllers.Todos, 'index'])
router.post('/create', [controllers.Todos, 'store'])
router.get('/delete', [controllers.Todos, 'destroy'])