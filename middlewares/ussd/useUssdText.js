export const useUssdText = (req,res,next)=>{
    const ussdText = req.body.text
    const ussdTextArray = ussdText.split("*")
    const ussdTextCount = ussdTextArray.length
    const payload = ussdTextArray[ussdTextCount - 1]

    req.ussdText = {
        ussdText,
        ussdTextArray,
        ussdTextCount,
        payload
    }

    next()
}