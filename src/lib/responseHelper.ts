export const ResponseHelper = {
    success:(data: any, message: string = "Request Success", status: 200) => {
        return new Response(
            JSON.stringify({
                status,
                success: true,
                message,
                data
            }),
            { status }
        )
    },
    error:(message = "Somthing went wrong", status = 400, error: any = null ) => {
        return new Response(
            JSON.stringify({
                status,
                success: false,
                message,
                error
            }),
            { status }
        )
    }
}