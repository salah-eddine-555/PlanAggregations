

db.loans.aggregate([
    {
        $match: { status: 'RETUREND'}
    },
    {
        $lookup: {
            from: "euipments",
            localField: "eq_id",
            foreignField: "_id",
            as: 'equipments'
        }
    },
    {
        $unwind : "equipment"
    },
    {
        $match: { "equipment.archived": false}
    },
    {
        $group: {
        _id: "$equipment.category",
        loanCount: {$sum: 1},
        avrageDays: {$avg : "$durationDays"},
        revenueCents :  { $sum: "$feeCents"}
        }
    },
    {
        $project: {
            _id: 0,
            category: "$_id",
            loanCount: 1,
            avregaeDays: { $round: ["$avrageDays", 2]},
            revenueCents : 1
        }
    },
    {
        sort: {
            revenueCents: -1,
            category: 1 
        }
    }

])