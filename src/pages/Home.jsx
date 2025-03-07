import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import Input from "../components/Input";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { QRCodeSVG } from "qrcode.react";

const Container = styled.div`
    min-width: 100vw;
    height: 100vh;

    overflow: auto;
`;

const qrCodes = [
    "b'\x00\x00\x00\x01\x00\x00\x035\x00\x00\x02\xc8\x00\x00\x00\x02\x00\x00\x00\x03\x00\x00\x00\n\x9dN\x01W\xbb\xbaD\xfe\x83\xa80\xc9Y\xb5`\x150E\x02 \x1c\xefG\xe0\xa5\x9c \xbbk\\\x15\xe76\xd2\x1cOa;\xa4\xaa\xf81s\xb8\xac[\xc8q\x95\x97\x92j\x02!\x00\xeei\xe2\x92Y\xf2Y\xb3\xbbA\xf6\xcay\xf8\xce4z>\x99\x07y\x1c\x9c\xe0x\xd0O\xd5\x99R,\x7f-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEhaOQnrPBTHob6HfGpx0QDjCJ+2nv\nYEoNFrAvUm8HBCfMFPg7HxhnXn3gGBtfrInNSUgJvK209LVdA41XdHclZg==\n-----END PUBLIC KEY-----\n0E\x02!\x00\xa6\x8c}\xd9\x1e\x97\x8eW\xbf?\xd1\xe0\xcdG\xc7\xfb\xb3\xf1H\x9d\x87\x99\x15\xaa\xdb\xcdI51\xcf\xf4\x14\x02 B\xcf\xda\xc0\x7fn\x14\x16\x8cE\xfc\xb2c\xe5m\xb4\xfaO\xcf\x015\xf8u\xae\xdbRf\x85f\x1b]>;9\xa3\xd6\x83\xf6L\xaf\xa6bm\xd0\x824O\xae\x00\x00\x00\x00g\x91\x86\x80\x00\x00\x00\x00g\xc9\xa2\x1a'",
    `{
    "d": {
        "v": 1,
        "tt": 626,
        "rid": 814,
        "d": 2,
        "zin": 14,
        "zout": 1
    },
    "cid": "7f5c23ef-8a75-4d51-994c-41f2e7b6d2d4",
    "s": "MEUCIGsZ1wT+H59D5i11nzBsBFNe/tZeKSIYgBE4pO6SFs1PAiEApgDheqEQPPe7m/QF9Rt5SJpNDWad/HXNPISzbZg89r0=",
    "cpk": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFRUZXVS84OWxkamVaSldyUXNGUElNcHp5S3NVWgpxUTJ4NnZKbXVHQi9GejFHNHhrWFdsUWorNmFzYmxBd0F5b29lM3VrdWcwSVk4Vmk2Z3puZmZhWm9BPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
    "pks": "MEYCIQDLfQ9Ip3JVgAZ7N5Y6GglkZyHGf28kZQuIRq+TZ77wbwIhANvSl6cVjUj8Ysn4343qtDIdTnQLB8xSbw6WrtlsEUnq",
    "caki": "95ffce13-0f5a-4035-a0b5-cce6a7fc5f71",
    "na": "2025-01-08T00:00:00",
    "t": "2025-03-06T13:08:31"
}`,
    "b'\x00\x00\x00\x01\x00\x00\x035\x00\x00\x02\xc8\x00\x00\x00\x02\x00\x00\x00\x03\x00\x00\x00\n\x9dN\x01W\xbb\xbaD\xfe\x83\xa80\xc9Y\xb5`\x150E\x02 \x1c\xefG\xe0\xa5\x9c \xbbk\\\x15\xe76\xd2\x1cOa;\xa4\xaa\xf81s\xb8\xac[\xc8q\x95\x97\x92j\x02!\x00\xeei\xe2\x92Y\xf2Y\xb3\xbbA\xf6\xcay\xf8\xce4z>\x99\x07y\x1c\x9c\xe0x\xd0O\xd5\x99R,\x7f-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEhaOQnrPBTHob6HfGpx0QDjCJ+2nv\nYEoNFrAvUm8HBCfMFPg7HxhnXn3gGBtfrInNSUgJvK209LVdA41XdHclZg==\n-----END PUBLIC KEY-----\n0E\x02!\x00\xa6\x8c}\xd9\x1e\x97\x8eW\xbf?\xd1\xe0\xcdG\xc7\xfb\xb3\xf1H\x9d\x87\x99\x15\xaa\xdb\xcdI51\xcf\xf4\x14\x02 B\xcf\xda\xc0\x7fn\x14\x16\x8cE\xfc\xb2c\xe5m\xb4\xfaO\xcf\x015\xf8u\xae\xdbRf\x85f\x1b]>;9\xa3\xd6\x83\xf6L\xaf\xa6bm\xd0\x824O\xae\x00\x00\x00\x00g\x91\x86\x80\x00\x00\x00\x00g\xc9\xa2\x1a'",
    `{
    "d": {
        "v": 1,
        "tt": 626,
        "rid": 814,
        "d": 2,
        "zin": 14,
        "zout": 1
    },
    "cid": "7f5c23ef-8a75-4d51-994c-41f2e7b6d2d4",
    "s": "MEUCIGsZ1wT+H59D5i11nzBsBFNe/tZeKSIYgBE4pO6SFs1PAiEApgDheqEQPPe7m/QF9Rt5SJpNDWad/HXNPISzbZg89r0=",
    "cpk": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFRUZXVS84OWxkamVaSldyUXNGUElNcHp5S3NVWgpxUTJ4NnZKbXVHQi9GejFHNHhrWFdsUWorNmFzYmxBd0F5b29lM3VrdWcwSVk4Vmk2Z3puZmZhWm9BPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
    "pks": "MEYCIQDLfQ9Ip3JVgAZ7N5Y6GglkZyHGf28kZQuIRq+TZ77wbwIhANvSl6cVjUj8Ysn4343qtDIdTnQLB8xSbw6WrtlsEUnq",
    "caki": "95ffce13-0f5a-4035-a0b5-cce6a7fc5f71",
    "na": "2025-01-08T00:00:00",
    "t": "2025-03-06T13:08:31"
}`,
    "b'\x00\x00\x00\x01\x00\x00\x035\x00\x00\x02\xc8\x00\x00\x00\x02\x00\x00\x00\x03\x00\x00\x00\n\x9dN\x01W\xbb\xbaD\xfe\x83\xa80\xc9Y\xb5`\x150E\x02 \x1c\xefG\xe0\xa5\x9c \xbbk\\\x15\xe76\xd2\x1cOa;\xa4\xaa\xf81s\xb8\xac[\xc8q\x95\x97\x92j\x02!\x00\xeei\xe2\x92Y\xf2Y\xb3\xbbA\xf6\xcay\xf8\xce4z>\x99\x07y\x1c\x9c\xe0x\xd0O\xd5\x99R,\x7f-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEhaOQnrPBTHob6HfGpx0QDjCJ+2nv\nYEoNFrAvUm8HBCfMFPg7HxhnXn3gGBtfrInNSUgJvK209LVdA41XdHclZg==\n-----END PUBLIC KEY-----\n0E\x02!\x00\xa6\x8c}\xd9\x1e\x97\x8eW\xbf?\xd1\xe0\xcdG\xc7\xfb\xb3\xf1H\x9d\x87\x99\x15\xaa\xdb\xcdI51\xcf\xf4\x14\x02 B\xcf\xda\xc0\x7fn\x14\x16\x8cE\xfc\xb2c\xe5m\xb4\xfaO\xcf\x015\xf8u\xae\xdbRf\x85f\x1b]>;9\xa3\xd6\x83\xf6L\xaf\xa6bm\xd0\x824O\xae\x00\x00\x00\x00g\x91\x86\x80\x00\x00\x00\x00g\xc9\xa2\x1a'",
    `{
    "d": {
        "v": 1,
        "tt": 626,
        "rid": 814,
        "d": 2,
        "zin": 14,
        "zout": 1
    },
    "cid": "7f5c23ef-8a75-4d51-994c-41f2e7b6d2d4",
    "s": "MEUCIGsZ1wT+H59D5i11nzBsBFNe/tZeKSIYgBE4pO6SFs1PAiEApgDheqEQPPe7m/QF9Rt5SJpNDWad/HXNPISzbZg89r0=",
    "cpk": "LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUZrd0V3WUhLb1pJemowQ0FRWUlLb1pJemowREFRY0RRZ0FFRUZXVS84OWxkamVaSldyUXNGUElNcHp5S3NVWgpxUTJ4NnZKbXVHQi9GejFHNHhrWFdsUWorNmFzYmxBd0F5b29lM3VrdWcwSVk4Vmk2Z3puZmZhWm9BPT0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==",
    "pks": "MEYCIQDLfQ9Ip3JVgAZ7N5Y6GglkZyHGf28kZQuIRq+TZ77wbwIhANvSl6cVjUj8Ysn4343qtDIdTnQLB8xSbw6WrtlsEUnq",
    "caki": "95ffce13-0f5a-4035-a0b5-cce6a7fc5f71",
    "na": "2025-01-08T00:00:00",
    "t": "2025-03-06T13:08:31"
}`,
];

const QrContainer = styled.div`
    width: 400px;
    padding-top: 200px;
    padding-left: 20px;
    padding-bottom: 200px;
    /* min-width: 100vw; */
    margin: auto;
`;

const Home = () => {
    return (
        <>
            <Container>
                {qrCodes.map((el, i) => (
                    <QrContainer key={el}>
                        <QRCodeSVG size={128 * (i/3 + 1)} value={el} />
                    </QrContainer>
                ))}
            </Container>
        </>
    );
};

export default Home;
