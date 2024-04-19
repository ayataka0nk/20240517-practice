declare -a pids

handle_sigint(){
    echo "Terminating all started processes..."
    for pid in "${pids[@]}"; do
        kill -SIGTERM "$pid" 2>/dev/null
    done
    wait
    echo "All processes have been terminated"
    exit
}

trap handle_sigint EXIT

# Docker コンテナを起動
echo "Starting Docker containers..."
cd backend
docker-compose up &
pids+=($!)
cd ..

# バックエンドを起動
echo "Starting backend..."
cd backend
python -m dev &
pids+=($!)
cd ..

# フロントエンドを起動
echo "Starting frontend..."
cd frontend
npm run dev &
pids+=($!)
cd ..



echo "Press Ctrl + C to stop all services."
wait

while true; do
    sleep 1
done
