import {useSelector} from "react-redux";

export const About = (props) => {
    const {locale} = useSelector(({settings}) => settings);
    return (
        <div id="about">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-6">
                        {" "}
                        <img src="img/about-us.png" className="img-responsive" alt=""  style={{backgroundColor: "#f5f5f5", borderRadius: "8px"}}/>{" "}
                    </div>
                    <div className="col-xs-12 col-md-6">
                        <div className="about-text">
                            {locale.name !== "English" ?
                                <><h2>VỀ PMP ENGLISH</h2>
                                <p>Được thành lập từ năm 2016, <strong>PMP English</strong> là đơn vị uy tín và chất
                                    lượng tại Việt Nam. PMP English đã, đang và sẽ đồng hành cùng Quý phụ huynh và
                                    học viên với các chương trình đào tạo <strong>Anh văn Giao tiếp Quốc tế, Anh văn
                                    Thiếu nhi, Luyện thi TOEIC 4 Kỹ năng và Luyện thi IELTS</strong> giúp đáp
                                    ứng đầy đủ cho nhu cầu học tập, làm việc, du học của học viên.</p><p>PMP English
                                    không ngừng nỗ lực hoàn thiện để mang đến cho học viên các chương trình <strong>vừa
                                    đảm bảo chất lượng</strong> về kiến thức, điểm số, <strong>vừa ứng dụng thực tế
                                    tốt</strong> vào học tập, công việc và cuộc sống.</p><p>Đến với PMP English, học
                                    viên được<strong> tư vấn lộ trình học phù hợp</strong> dựa vào kết quả bài kiểm tra
                                    trình độ đầu vào, mục tiêu và nhu cầu học của từng học viên.</p><p>Với mục tiêu mang
                                    đến một môi trường học tập ưu việt, <strong>PMP English</strong> luôn nỗ lực tạo
                                    dựng cho học viên nền tảng tiếng Anh tốt nhất để <strong>sẵn sàng vươn đến thành
                                    công trong tương lai</strong>.</p></> :
                                <><h2>About PMP ENGLISH</h2>
                                    <p>Established in 2016, <strong>PMP English</strong> is a reputable and quality unit
                                        quantity in Vietnam. PMP English has been and will be accompanying parents and
                                        students with training programs <strong>English for International Communication, English
                                        Children, TOEIC 4 Skills and IELTS Preparation</strong> help answer
                                        fully meet the needs of students to study, work and study abroad.</p><p>PMP English
                                        constantly strive to improve to provide students with <strong>medium programs
                                        quality assurance</strong> in terms of knowledge, scores, <strong>and practical application
                                        good</strong> to study, work and life.</p><p>Come to PMP English, learn
                                        students are given <strong> advice on suitable study path</strong> based on test results
                                        entrance level, goals and learning needs of each student.</p><p>With the goal of bringing
                                        To a superior learning environment, <strong>PMP English</strong> always strives to create
                                        build students the best English foundation so that <strong>ready to reach success
                                        future success</strong>.</p></>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
