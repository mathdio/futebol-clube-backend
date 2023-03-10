import * as express from 'express';
import 'express-async-errors';
import teamsRoutes from './routes/teamsRoutes';
import usersRoutes from './routes/usersRoutes';
import matchesRoutes from './routes/matchesRoutes';
import leaderboardRoutes from './routes/leaderboardRoutes';
import ErrorMiddleware from './middlewares/errorMiddleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.initRoutes();
    this.initErrorMiddleware();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private initRoutes(): void {
    this.app.use('/teams', teamsRoutes);
    this.app.use('/login', usersRoutes);
    this.app.use('/matches', matchesRoutes);
    this.app.use('/leaderboard', leaderboardRoutes);
  }

  private initErrorMiddleware(): void {
    this.app.use(ErrorMiddleware.handle);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
