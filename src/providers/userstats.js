const HttpClient = require('../http.js')
const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_userstats')

module.exports = function (client) {
    var provider = BaseProvider(client)
    provider._endpoint = 'https://userstats.xboxlive.com'

    provider._headers['x-xbl-contract-version'] = 2

    // provider.getUserTitleStats = function (titleId) {
    //     Debug('getUserTitleStats(' + titleId + ')')
    //
    //     return this.post(
    //         '/batch',
    //         `{"arrangebyfield":"xuid","xuids":["${this._client._authentication._user.xid}"],"groups":[{"name":"Hero","titleId":"${titleId}"}],"stats":[{"name":"MinutesPlayed","titleId":"${titleId}"}]}`
    //     )
    // }

    // allow multiple ids
    provider.getUserTitleStats = function (titleIds) {
        Debug('getUserTitleStats(' + titleIds + ')')

        const titleIdArray = Array.isArray(titleIds) ? titleIds : [titleIds];

        // Create group and stats objects for all titleIds
        const groups = titleIdArray.map(id => ({ name: "Hero", titleId: id }));
        const stats = titleIdArray.map(id => ({ name: "MinutesPlayed", titleId: id }));

        return this.post(
            '/batch',
            JSON.stringify({
                arrangebyfield: "xuid",
                xuids: [this._client._authentication._user.xid],
                groups: groups,
                stats: stats
            })
        );
    }

    return provider
}