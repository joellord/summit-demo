# echo "First, we'll need to update to 4.3.9"
# export OPENSHIFT_UPGRADE_VERSION="4.3.9"
# echo "Upgrading this cluster to version $OPENSHIFT_UPGRADE_VERSION"
# oc patch clusterversions/version -p '{"spec":{"channel":"stable-4.3"}}' --type=merge
# echo "Waiting 2 minutes for patching to happen..."
# sleep 150
# echo "Ready to upgrade cluster to version $OPENSHIFT_UPGRADE_VERSION"
# echo "This will take approximately 30-60 minutes"
# echo "You should get an update every minute or so"
# oc adm upgrade --to $OPENSHIFT_UPGRADE_VERSION
# sleep 120
# while [ $(oc get clusterversion | awk '{print $4}' | grep True) ]; do
#   echo $(oc get clusterversion | awk 'FNR == 2 { s = ""; for (i = 6; i <= NF; i++) s = s $i " "; print s }')
#   sleep 120
# done
# echo "Cluster should have been upgraded now, you can verify here"
# oc get clusterversion

echo "Time to upgrade!"
# Change this to the version you want to upgrade to
# export OPENSHIFT_UPGRADE_VERSION="4.4.0-rc.8"
echo "What version do you want to upgrade to?"
read OPENSHIFT_UPGRADE_VERSION
echo "Upgrading this cluster to version $OPENSHIFT_UPGRADE_VERSION"
echo "Where shall we find this version (stable, fast, candidate) ?"
read CHANNEL
CHANNEL=$CHANNEL-${OPENSHIFT_UPGRADE_VERSION:0:3}
echo "Ok, patching clusterversions with ${CHANNEL}"
oc patch clusterversions/version -p "{\"spec\":{\"channel\":\"${CHANNEL}\"}}" --type=merge
echo "Waiting 2 minutes for patching to happen..."
sleep 150
echo "Ready to upgrade cluster to version $OPENSHIFT_UPGRADE_VERSION"
echo "This will take approximately 30-60 minutes"
echo "You should get an update every minute or so"
oc adm upgrade --to $OPENSHIFT_UPGRADE_VERSION
sleep 120
while [ $(oc get clusterversion | awk '{print $4}' | grep True) ]; do
  echo $(oc get clusterversion | awk 'FNR == 2 { s = ""; for (i = 6; i <= NF; i++) s = s $i " "; print s }')
  sleep 120
done
echo "Cluster should have been upgraded now, you can verify here"
oc get clusterversion
