const BaseProvider = require('./base.js')
const Debug = require('debug')('xbox-webapi-node:provider_titlehub')

module.exports = function(client){

    var provider = BaseProvider(client)
    provider._endpoint = 'https://titlehub.xboxlive.com'

    provider.getTitleHistory = function(params = ['achievement', 'image', 'scid'], maxItems) {
        Debug(`getTitleHistory(params: ${params.join(', ')}${maxItems ? `, maxItems: ${maxItems}` : ''})`)

        let url = `/users/xuid(${this._client._authentication._user.xid})/titles/titlehistory/decoration/${params.join(',')}`

        if (maxItems !== undefined) {
            url += `?maxItems=${maxItems}`
        }

        return this.get(url)
    }

    provider.getTitleId = function(titleId, params = ['achievement', 'image', 'detail', 'scid', 'alternateTitleId']) {
        Debug(`getTitleId(${titleId}, params: ${params.join(', ')})`)

        return this.get(
            `/users/xuid(${this._client._authentication._user.xid})/titles/titleid(${titleId})/decoration/${params.join(',')}`
        )
    }

    return provider
}