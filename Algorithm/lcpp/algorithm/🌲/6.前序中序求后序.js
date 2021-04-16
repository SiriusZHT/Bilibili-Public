let preTraval, inTraval;
while((preTraval = readLine()) != null) {
    inTraval = readLine();
    print(getHRF(preTraval, inTraval));
}

function getHRF(preTraval, inTraval) {
    if(preTraval.length == 0) {
        return;
    }
    if(preTraval.length == 1) {
        return preTraval[0];
    }
    const root = preTraval[0];
    const index = inTraval.indexOf(root);

    const inLeft = inTraval.substring(0, index); // index is root
    const inRight = inTraval.substring(index + 1);

    const preLeft = preTraval.substring(1, index + 1);
    const preRight = preTraval.substring(index + 1);

    return getHRF(preLeft, inLeft) + getHRF(preRight, inRight);
}