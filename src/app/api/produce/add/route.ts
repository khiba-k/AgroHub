import { createProduce } from "@/actions/produce/produceActions"
import { badRequest, created, serverError } from "@/lib/utils/responseHandler"
import { produceFormSchema } from "@/screens/agrohub/utils/produceFromValidation"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = produceFormSchema.safeParse(body)
    if (!parsed.success) {
      return badRequest('Invalid input data')
    }

    const result = await createProduce(parsed.data)
    return created(result, 'Produce created successfully')
  } catch (error) {
    return serverError(
        'Failed to create produce',
        error instanceof Error ? error : new Error(String(error))
    )
  }
}
