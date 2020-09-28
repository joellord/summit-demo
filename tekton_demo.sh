echo "Applying Hello task"
kubectl apply -f ./beta/hello-task.yaml
echo "Run Task hello-task"
tkn task start hello-task --showlog
echo "Applying Hello With Name task"
kubectl apply -f ./beta/hello-name-task.yaml
echo "Run Task hello-name-task With Defaults"
tkn task start hello-name-task --showlog
echo "Apply Hello With Name Pipeline"
kubectl apply -f ./beta/hello-name-pipeline.yaml
echo "Run Pipeline without params"
tkn pipeline start hello-name-pipeline --showlog
echo "Specify who param"
tkn pipeline start hello-name-pipeline -p who=Joel --showlog
