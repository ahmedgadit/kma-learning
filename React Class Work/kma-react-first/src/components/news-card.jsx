import { Box, Image, Stack, Text } from "@chakra-ui/react";

const NewsCard = ({ title, description, imageUrl, imagePayload }) => {
    let imageSrc = imageUrl;

    if (!imageSrc && imagePayload) {
        try {
            const images = imagePayload;
            if (images.length > 1) {
                imageSrc = images[1].url;
            }
        } catch (error) {
            console.error("Error parsing imagePayload:", error);
        }
    }

    return (
        
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    alt={title}
                    height="48"
                    objectFit="cover"
                    width="full"
                />
            ) : (
                <Box
                    height="48"
                    bg="gray.200"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text color="black">No Image Available</Text>
                </Box>
            )}
            <Stack p={4}>
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                    {title}
                </Text>
                <Text color="gray.700">{description}</Text>
            </Stack>
        </Box>
        
    );
};

export default NewsCard;