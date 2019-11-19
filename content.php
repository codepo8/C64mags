<?PHP

echo '<!--'.$_SERVER['PHP_SELF'].'-->';
include('content'.str_replace('.php','.html',$_SERVER['PHP_SELF']));

?>