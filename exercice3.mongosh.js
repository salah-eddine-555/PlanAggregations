

db.loans.aggregate([
    {
        $match: {status: "RETUREND"}
    },
    {
        $lookup: {
            from: 'equipments',
            localField: 'equipmentId',
            foreignField: '_id',
            as: 'equipments'
        }
    },
    {
        $unwind: "equipment"
    },
    {
        $lookup: {
            from: 'members',
            localField: 'memberId',
            foreignField: '_id',
            as: 'members'
        }
    },
    { $unwind: 'member'},
    {
        $match: {
            "$equipment.archived": false,
            "$member.active": true 
        }
    },
    {
        $group: {
            _id: '$member.city',
            loanCount: { $sum: 1},
            revenueCents: { $sum : '$feeCents'}
        }
    },
    {
    $project: {
        _id: 0,
        city: "$_id",
        loanCount: 1,
        revenueCents: 1
        }
    }

])