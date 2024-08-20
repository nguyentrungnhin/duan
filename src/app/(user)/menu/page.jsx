export default function Menu() {
    return (
        <div className="container mt-5">
            <h1>Menu</h1>
            <div className="row">
                <div className="col-sm-3">
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5 className="mb-0">Danh mục</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">An item</li>
                            <li class="list-group-item">A second item</li>
                            <li class="list-group-item">A third item</li>
                        </ul>
                    </div>
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5 className="mb-0">Sắp xếp</h5>
                        </div>
                        <div className="card-body">
                            <div className="btn-group">
                                <button className="btn btn-dark">Giá tăng</button>
                                <button className="btn btn-outline-dark">Giá giảm</button>
                            </div>
                        </div>
                    </div>
                    <div class="card mb-3">
                        <div class="card-header">
                            <h5 className="mb-0">Khoảng giá</h5>
                        </div>
                        <div className="card-body">
                            <div className="input-group">
                                <div className="input-group-text">từ</div>
                                <input type="number" className="form-control" min={10000} max={100000} step={5000} />
                                <div className="input-group-text">đến</div>
                                <input type="number" className="form-control" min={10000} max={100000} step={5000} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-9">
                    Show sản phẩm
                </div>
            </div>
        </div>
    )
}