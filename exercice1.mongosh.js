
db.loans.aggregate([
    {
        $match: {status: 'RETURNED'}
    },
    {
        $group: {
        _id: '$memberId',
        revenueCents: { $sum: '$feeCents'},
        returendLoanCount: { $sum: 1}
        }
    },
    {
        $sort: {revenueCents: - 1, _id: 1}
    }

]);