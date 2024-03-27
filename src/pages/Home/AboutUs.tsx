import {
	AccordionContent,
	Box,
	Center,
	HStack,
	Heading,
	Image,
	Text,
	VStack,
} from "@gluestack-ui/themed";
import { AccordionContentText } from "@gluestack-ui/themed";
import {
	Accordion,
	AccordionHeader,
	AccordionIcon,
	AccordionItem,
	AccordionTitleText,
	AccordionTrigger,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@gluestack-ui/themed";
import React, { useContext } from "react";
import { LangContext } from "../../Context/lang";
import MemberItem, { MemberInformation } from "../../components/MemberItem";

const AboutUs = () => {
	const { trans } = useContext(LangContext);
	return (
		<Box px="$1">
			<Heading textAlign="center">About us</Heading>
			<Accordion
				width="100%"
				size="md"
				variant="unfilled"
				type="multiple"
				isCollapsible={true}
				isDisabled={false}
			>
				<AccordionItem value="a">
					<AccordionHeader>
						<AccordionTrigger>
							{({ isExpanded }) => {
								return (
									<>
										<AccordionTitleText>
											{trans({ en: "Project recap", vi: "Tóm tắt dự án" })}
										</AccordionTitleText>
										{isExpanded ? (
											<AccordionIcon as={ChevronUpIcon} ml="$3" />
										) : (
											<AccordionIcon as={ChevronDownIcon} ml="$3" />
										)}
									</>
								);
							}}
						</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent>
						<Center>
							<Image
								w={250}
								alt="Belt"
								source={require("../../assets/imgs/product/belt.png")}
							></Image>
						</Center>
						<AccordionContentText>
							{trans({
								en: "Recognizing the danger and consequences of prolonged exposure to hot weather, which can affect human health, especially outdoor workers and laborers, THE SHARK TEAM specifically aims to address technology drivers.\n\nWith a passion for creativity and a desire to help the community, we have invented, built, and developed a product called “SMART AIR-CONDITIONING BELT INTEGRATED WITH BLUETOOTH CONTROL APP”.\n\nThe purpose of this product is to reduce the feeling of heat, balance body temperature, cool the body, and create a comfortable feeling, support health, prevent diseases caused by hot weather, improve work efficiency, and contribute to increased productivity.\n\nThe product is combined with modern technology, controlled by a phone with a Bluetooth connection for convenience and has an automatic fan speed adjustment mode suitable for body temperature. The belt and fan are designed to fit snugly, securely, aesthetically, safe for the user, and highly durable. Besides, it also features fast charging via USB port, battery capacity up to 8800 mAh, and usage time up to 6-8 hours, helping to save energy. This is a novel product compared to others on the market, and we believe that with the features and effectiveness it brings, it will help technology drivers reduce stress and fatigue when driving for long periods in hot weather and bring high productivity in work.\n\nWe hope that the product can develop further, not only for technology motorcycle taxi drivers but also bring value to many other customer segments in the future.",
								vi: "Nhận thấy được mức độ nguy hiểm và hậu quả của thời tiết nắng nóng trong thời gian dài sẽ ảnh hưởng đến sức khỏe của con người và đặc biệt là những người lao động và làm việc ngoài trời, đối tượng cụ thể mà THE SHARK TEAM muốn hướng đến đó chính là tài xế công nghệ.\n\nVới niềm đam mê sáng tạo và mong muốn giúp đỡ cộng đồng, chúng tôi đã phát minh, xây dựng và phát triển sản phẩm mang tên “ ĐAI ĐIỀU HÒA THÔNG MINH TÍCH HỢP APP ĐIỀU KHIỂN BLUETOOTH”.\n\nVới mục đích sản phẩm đó chính là làm giảm cảm giác nóng bức, cân bằng nhiệt độ cơ thể , làm mát cơ thể và tạo cảm giác thoải mái, hỗ trợ sức khỏe, tránh gấy nên các bệnh lý về sức khỏe do thời tiết nắng nóng, cải thiện hiệu suất làm việc và góp phần làm tăng năng suất công việc.\n\nSản phẩm được kết hợp với công nghệ hiện đại, được điều khiển trên điện thoại có kêt nối bluetooth để thuận tiện khi sử dụng và có chế độ tự động điều chỉnh tốc độ quạt phù hợp với nhiệt độ của cơ thể. Phần đai và quạt được thiết kế vừa vặn, chắc chắn, có tính thẩm mỹ, an toàn cho người sử dụng và độ bền cao. Bên cạnh đó còn có tính năng sạc nhanh qua cổng USB, dung lượng pin lên đến 8800 mAh và thời gian sử dụng lên đến 6-8 tiếng, giúp tiết kiệm năng lượng. Đây là sản phẩm mới lạ so với các sản phẩm khác trên thị trường, chúng tôi tin rằng với những tính năng và hiệu quả mà sản phẩm mang lại sẽ giúp tài xế công nghệ giảm bớt căng thẳng mệt mỏi khi chạy xe thời gian dài ngoài trời nắng nóng và đem lại năng suất cao trong công việc.\n\nChúng tôi hy vọng rằng sản phẩm có thể phát triển xa hơn không chỉ đối với đối tượng là xe ôm công nghệ mà còn mang lại giá trị cho nhiều đối tượng khách hàng khác trong tương lai.",
							})}
						</AccordionContentText>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="c">
					<AccordionHeader>
						<AccordionTrigger>
							{({ isExpanded }) => {
								return (
									<>
										<AccordionTitleText>
											{trans({ en: "Who we are", vi: "Chúng tôi là ai" })}
										</AccordionTitleText>
										{isExpanded ? (
											<AccordionIcon as={ChevronUpIcon} ml="$3" />
										) : (
											<AccordionIcon as={ChevronDownIcon} ml="$3" />
										)}
									</>
								);
							}}
						</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent>
						<HStack gap="$2" alignItems="center" justifyContent="space-between">
							<Image
								resizeMode="contain"
								height={50}
								alt="iuh"
								source={require("../../assets/imgs/logo/iuh.png")}
							></Image>

							<Image
								resizeMode="contain"
								height={75}
								alt="iuh"
								source={require("../../assets/imgs/logo/thesharks.png")}
							></Image>
							<Image
								resizeMode="contain"
								height={75}
								alt="iuh"
								source={require("../../assets/imgs/logo/saco.png")}
							></Image>
						</HStack>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="b">
					<AccordionHeader>
						<AccordionTrigger>
							{({ isExpanded }) => {
								return (
									<>
										<AccordionTitleText>
											{trans({
												en: "Team members",
												vi: "Danh sách thành viên",
											})}
										</AccordionTitleText>
										{isExpanded ? (
											<AccordionIcon as={ChevronUpIcon} ml="$3" />
										) : (
											<AccordionIcon as={ChevronDownIcon} ml="$3" />
										)}
									</>
								);
							}}
						</AccordionTrigger>
					</AccordionHeader>
					<AccordionContent>
						{informations.map((info, index) => (
							<MemberItem key={index} {...info} />
						))}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</Box>
	);
};

const informations: MemberInformation[] = [
	{
		img: require("../../assets/imgs/team/thu.png"),
		color: "#ecbdc7",
		name: "Trần Thị Minh Thư",
		major: { en: "English Language", vi: "Ngôn ngữ Anh" },
		interest: {
			en: "Smart technology products serving the community and having the potential to serve the market.",
			vi: "Các sản phẩm công nghệ thông minh phục vụ cộng đồng và có tiềm năng phục vụ thị trường.",
		},
		reasons: {
			en: "Want to challenge oneself with a major competition and contribute to creating valuable products for society.",
			vi: "Muốn thử sức với một cuộc thi lớn và góp phần tạo ra sản phẩm giá trị cho xã hội.",
		},
	},
	{
		img: require("../../assets/imgs/team/thien.png"),
		color: "#2196F3",
		name: "Lê Chí Thiện",
		major: {
			en: "IoT and Applied Artificial Intelligence",
			vi: "IOT và trí tuệ nhân tạo ứng dụng",
		},
		interest: {
			en: "Smart technology products serving the community and having the potential to serve the market.",
			vi: "Các sản phẩm công nghệ thông minh phục vụ cộng đồng và có tiềm năng phục vụ thị trường.",
		},

		reasons: {
			en: "Want to build products for the community's benefit, creating value for society.",
			vi: "Muốn xây dựng sản phẩm phục vụ lợi ích cộng đồng tạo ra giá trị cho xã hội.",
		},
	},
	{
		img: require("../../assets/imgs/team/doan.png"),
		color: "#FF9800",
		name: "Trần Xuân Đoan",
		major: { en: "International Business", vi: "Kinh doanh quốc tế" },
		interest: {
			en: "Smart technology products with the desire to serve the community and contribute to societal development.",
			vi: "Các sản phẩm công nghệ thông minh với mong muốn phục vụ cộng đồng và phát triển xã hội.",
		},
		reasons: {
			en: "Want to learn practical knowledge, research business fields to develop future enterprises.",
			vi: "Muốn học hỏi những kiến thức thực tế, muốn nghiên cứu về lĩnh vực kinh doanh để phát triển doanh nghiệp trong tương lai.",
		},
	},
	{
		img: require("../../assets/imgs/team/canh.png"),
		color: "#607D8B",
		name: "Nguyễn Thanh Cảnh",
		major: { en: "Software Engineering", vi: "Kỹ thuật phần mềm" },
		interest: {
			en: "Building software products, websites serving the community.",
			vi: "Xây dựng sản phẩm phần mềm, website phục vụ cộng đồng.",
		},
		reasons: {
			en: "Help friends turn their ideas into products while learning and improving personal skills.",
			vi: "Giúp biến ý tưởng của các bạn thành sản phẩm đồng thời nâng cao năng lực bản thân.",
		},
	},
	{
		img: require("../../assets/imgs/team/huyen.png"),
		color: "#FFC107",
		name: "Nguyễn Minh Huyền",
		major: {
			en: "E-commerce",
			vi: "Thương mại điện tử",
		},
		interest: {
			en: "Smart products, devices addressing human life needs and maintaining sustainable nature.",
			vi: "Các sản phẩm, thiết bị thông minh giải quyết các nhu cầu trong đời sống con người và duy trì thiên nhiên bền vững.",
		},
		reasons: {
			en: "Want to learn and practice practical knowledge about product development in business, create products that protect people's health while working outdoors.",
			vi: "Muốn học hỏi và rèn luyện kiến thức thực tế về phát triển sản phẩm trong kinh doanh, có sản phẩm giúp bảo vệ sức khỏe người dân trong khi làm việc dưới trời nắng.",
		},
	},
	{
		img: require("../../assets/imgs/team/nguyen.png"),
		color: "#7E57C2",
		name: "Lê Thị Bình Nguyên",
		major: {
			en: "Marketing",
			vi: "Marketing",
		},
		interest: {
			en: "Products serving human life and health.",
			vi: "Các sản phẩm phục vụ đời sống và sức khoẻ của con người.",
		},
		reasons: {
			en: "Want to learn research and innovation experience to create community-serving products, gain hands-on experience to accumulate personal knowledge and experience.",
			vi: "muốn học hỏi kinh nghiệm nghiên cứu và sáng tạo sản phẩm phục vụ cộng đồng, được cọ sát bản thân với thực tế để tích lũy kinh nghiệm cho bản thân.",
		},
	},
	{
		img: require("../../assets/imgs/team/thao.png"),
		color: "#009688",
		name: "Lê Thị Thu Thảo",
		major: {
			en: "E-commerce",
			vi: "Thương mại điện tử",
		},
		interest: {
			en: "Technology products serving human life and health.",
			vi: "Sản phẩm công nghệ phục vụ các nhu cầu đời sống và sức khỏe con người.",
		},
		reasons: {
			en: "Want to experience projects to closely engage with reality and accumulate more knowledge and experience for the future.",
			vi: "Muốn trải nghiệm qua những dự án để được cọ sát với thực tế và tích lũy thêm nhiều kiến thức và kinh nghiệm cho bản thân sau này.",
		},
	},
];

export default AboutUs;
