import Handsfree from 'handsfree'
 
const handsfree = new Handsfree({hands: true})
handsfree.enablePlugins('browser')
handsfree.start();