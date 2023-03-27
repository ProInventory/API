const { Branch, validate } = require("../models/branch");

exports.getBranches = async (req, res) => {
    const branches = await Branch.find().sort("name");
    res.send(branches);
};

exports.getBranch = async (req, res) => {
    const branch = await Branch.findById(req.params.id);
    if (!branch)
        return res
            .status(404)
            .send("The branch with the given ID was not found.");
    res.send(branch);
};

exports.createBranch = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const branch = new Branch({
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        manager: req.body.manager,
    });

    await branch.save();
    res.send(branch);
};

exports.updateBranch = async (req, res) => {
    if (
        !req.body.name ||
        !req.body.address ||
        !req.body.phoneNumber ||
        !req.body.email ||
        !req.body.manager
    )
        return res.status(400).send("Missing required fields.");

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const branch = await Branch.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            manager: req.body.manager,
        },
        { new: true }
    );

    if (!branch)
        return res
            .status(404)
            .send("The branch with the given ID was not found.");

    res.send(branch);
};

exports.deleteBranch = async (req, res) => {
    const branch = await Branch.findByIdAndRemove(req.params.id);
    if (!branch)
        return res
            .status(404)
            .send("The branch with the given ID was not found.");

    res.send(branch);
};
