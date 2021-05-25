import prefix from './prefix';
import suffix from './suffix';
import {bind} from './utils/index'

export default str => suffix(prefix(str)); 