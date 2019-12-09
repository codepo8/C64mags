<?PHP

echo '<!--'.$_SERVER['PHP_SELF'].'-->';
$self = $_SERVER['PHP_SELF'];
$self = str_replace('.php','.html', $self);
$self = preg_replace("/^\/mags\//",'', $self);
include('content/'.$self);

?>