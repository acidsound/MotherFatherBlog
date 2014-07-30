/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 6. 5.
 * Time: 오전 9:35
 * To change this template use File | Settings | File Templates.
 */
/* localhost doesn't need kadira integration */ 
if (process.env.ROOT_URL.indexOf('http://localhost')) {
  Kadira.connect('KM5qoozaxzYjH7o38', '2fb8b9df-4dab-4cc1-a81e-dddee142e14a');
}
