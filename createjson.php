<?php ob_start("ob_gzhandler");
header('Content-Type: application/json');
function clean($str){
    $str = str_replace("/\n/g",'',$str);
    $str = stripslashes($str);
    $str = str_replace('"','',$str);
    return $str;
}
$row = 1;
$rows = array();
if (($handle = fopen("mags.csv", "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $row++;
        $rows[$row] = $data;
    }
    fclose($handle);
}
natcasesort($rows);
$json = '{"title":"mags",';
$json .= '"format":"Name,Title,Group,Imagelink,Link,Comments",';
$json .= '"mags":[';
$lines = array();
foreach ($rows as $rs) {
    array_push($lines, 
        '{"n":"'.clean($rs[0]).'",'.
        '"t":"'.clean($rs[3]).'","g":"'.clean($rs[4]).'",'.
        '"i":"'.clean($rs[5]).'","l":"'.$rs[6].'",'.
        '"c":"'.clean($rs[7]).'"}'
    );
}
$json .= join($lines,",\n").'],"build":"'.date("Y-m-d h:i:sa").'"}';
echo $json;
echo $_GET['packed'];
ob_flush();
?>