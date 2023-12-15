import { NextFunction, Request, Response, Router } from "express";
import { App } from "./app";
import { ResponseModel } from "./core/models/response.model";
import { HTTPStatusCodes } from "./core/constants";
import { EmployeeIndexRoute } from "./resources/employees/routes/index.route";

export const sampleRoute: Router = Router();

sampleRoute.all("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json(
      new ResponseModel({
        success: true,
        status: HTTPStatusCodes.OK,
        result: {
          data: {
            message:
              "🎉 Woohoo! It works! 🚀 Time to get things done! Let's embark on our journey and make magic happen! 💻✨ #ProductivityModeActivated 🎊👏 Let's do this bro! 🙌",
            motto:
              "Well, look at you, breaking records! 🎉 You've officially achieved the 'Quarter Century and Still Cozy at Home' status. Who needs bills, right? Living the dream! 😂🏠 #ParentalSuiteLife",
          },
        },
      })
    );
  } catch (error) {
    next(error);
  }
});

const app: App = new App([{ router: sampleRoute }, new EmployeeIndexRoute()]);
app.listen();
