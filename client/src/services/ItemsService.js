import Api from '@/services/Api'
export default {
    index(search) {
        return Api().get('items', {
            params: {
                search: search
            }
        })
    },
    frontIndex(search) {
        return Api().get('items/front', {
            params: {
                search: search
            }
        })
    },
    show(itemId) {
        return Api().get('item/' + itemId)
    },
    post(item) {
        return Api().post('item', item)
    },
    put(item) {
        return Api().put('item/' + item.id, item)
    },
    delete(item) {
        return Api().delete('item/' + item.id, item)
    },
}