


db.maintenance.aggregate([
    {
        $match: { status: 'DONE'}
    },
    {
        $lookup: {
            from: 'equipments',
            localField: 'equipmentId',
            foreignId: '_id',
            as: 'equipment'
        }
    },
    { $unwind: 'equipment'},
    {
        $match: {
            "$equipment.archived": false
        }
    },
    {
        $group: {
            _id: '$equipment.category',
            interventionCount: { $sum: 1},
            totalCents: {$sum: "$costCents"},
            avregeCostCents: { $avg : "$costCents"}
        }
    },
    {
    $project: {
        _id: 0,
        category: "$_id",
        interventionCount: 1,

        averageCostCents: {
            $round: ["$averageCostCents", 2]
        },

        totalCostCents: 1
    }
    }
])