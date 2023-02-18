import validateJs from "validate.js";
import { BadRequest } from "http-errors";

function validate(input: any, constraints: any) {
  const errors = validateJs(input, constraints, { format: "flat" });
  if (errors) {
    throw new BadRequest(JSON.stringify(errors));
  }
}

function validateId(input: any) {
  validate(
    { id: input },
    {
      id: {
        presence: true,
        numericality: {
          onlyInteger: true,
          strict: true,
        },
      },
    }
  );
}

export { validateId, validate };
