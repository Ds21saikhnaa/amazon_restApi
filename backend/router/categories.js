import {Router} from "express";
const router = Router();
router.get('/', (req, res) => {
    res.status(200).json({
        hello: "snu",
        data: ["adal", "aimshig"],
    })
});
router.get('/:id', (req, res) => {
    res.status(200).json({
        hello: "snu",
        data: `${req.params.id}-ta cat medeeelel`,
    })
});
router.post('/', (req, res) => {
    res.status(200).json({
        hello: "snu",
        data: "uuslee"
    })
});
router.put('/:id', (req, res) => {
    res.status(200).json({
        hello: "snu",
        data: `${req.params.id}-ta cat update hiigdlee`,
    })
});
router.delete('/:id', (req, res) => {
    res.status(200).json({
        hello: "snu",
        data: `${req.params.id}-ta cat ustlaa`,
    })
});
export default router;